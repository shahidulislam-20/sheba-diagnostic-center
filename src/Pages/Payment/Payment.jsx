import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_secret_pk);

const Payment = () => {

    const location = useLocation();
    console.log(location.state.bookingInfo)


    return (
        <div className="max-w-7xl mx-auto py-28">
            <div className="mt-5">
                <h3 className="text-4xl uppercase font-bold text-center">Payment</h3>
                <h4 className="font-bold uppercase text-center mb-10">Total Payable Price : ${location.state.bookingInfo.price}</h4>
            </div>
            <div className="lg:mx-20 mx-5 md:mx-10">
                <Elements stripe={stripePromise}>
                    <CheckoutForm testInfo={location.state.bookingInfo}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;