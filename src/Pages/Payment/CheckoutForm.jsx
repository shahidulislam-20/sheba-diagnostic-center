import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import './StripeForm.css';


// eslint-disable-next-line react/prop-types
const CheckoutForm = ({testInfo}) => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    // eslint-disable-next-line react/prop-types
    const price = parseInt(testInfo.price);

    useEffect(() => {
        if (price) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'annonymous',
                    email: user?.email || 'annonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id);

                //payment info save the database
                
                const res = await axiosSecure.post('/payments', {...testInfo, trxId: paymentIntent.id})
                console.log(res.data)
                if(res.data?.paymentResult.insertedId){
                    
                    Swal.fire({
                        position: "center-center",
                        icon: "success",
                        title: "Your payment successful",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
        }
    }

    return (
        <form className="StripeForm" onSubmit={handleSubmit}>
            <CardElement
                className="CardElement"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="PayButton" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && <p>Your transaction id : {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;