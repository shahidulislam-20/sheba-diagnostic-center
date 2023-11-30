import { useContext, useEffect, useState } from 'react';
import testImg from '../../assets/test-details.jpg';
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const TestDetails = () => {

    const loadedData = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [banner, setBanner] = useState([]);
    const [disPrice, setDisPrice] = useState(loadedData.details.price)
    const [promoValue, setPromoValue] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.get(`/banner/${true}`)
            .then(res => setBanner(res.data))
    }, [axiosPublic])

    useEffect(() => {
        axiosSecure.get(`/user/${user?.email}`)
        .then(res => {
            setUserStatus(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [axiosSecure, user?.email])


    const handlePromo = () => {
        if (banner.couponCode !== promoValue.target.value) {
            return;
        }
        console.log(promoValue.target.value)
        const price = parseInt(loadedData.details.price);
        const discount = banner.discountRate;
        const total = price - ((price * discount) / 100);
        setDisPrice(total)
    }

    const handleBooking = (e) => {
        e.preventDefault();
        
        const form = e.target;
        const date = form.date.value;
        const time = form.time.value;
        const price = disPrice;
        const email = user.email;
        const title = loadedData.title;
        const duration = loadedData.details.duration;
        const id = loadedData._id;
        const status = 'pending';
        const bookingInfo = { date, time, price, email, title, duration, id, status };
        navigate('/payment', {state: {bookingInfo}})
    }

    return (
        <div className="max-w-7xl mx-auto pt-10 pb-28">
            <h2 className='text-center font-bold uppercase text-5xl mb-10 bg-prime py-5 rounded-full text-white'>Test Details</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-14">
                <div className="lg:col-span-2">
                    <div className="relative">
                        <img className="w-full" src={loadedData.image} alt="test-details" />
                        <h3 className="absolute bottom-0 left-0 bg-prime w-full py-5 text-3xl font-bold bg-opacity-50 pl-10">Price : ${loadedData.details.price}</h3>
                    </div>
                    <div className="bg-[#f6f6f6] p-10">
                        <h3 className="text-4xl font-bold mt-5">{loadedData.title}</h3>
                        <p className="text-xl mt-2">{loadedData.shortDescription}</p>
                        <div className="flex justify-between md:flex-row flex-col">
                            <div>
                                <h3 className="font-bold rounded-full uppercase mt-5">Avaiable Dates :</h3>
                                <ul className="mt-2">
                                    {loadedData.availableDates.map(data => <li key={data}
                                        className="flex items-center gap-5 font-bold"
                                    ><FaArrowRight></FaArrowRight>{data}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold rounded-full uppercase mt-5">Avaiable Times :</h3>
                                <ul className="mt-2">
                                    {loadedData.times.map(data => <li key={data}
                                        className="flex items-center gap-5 font-bold"
                                    ><FaArrowRight></FaArrowRight>{data}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold rounded-full uppercase mt-5">Test Details :</h3>
                            <ul className="font-bold mt-2">
                                <li>Duration : {loadedData.details.duration}</li>
                                <li>Preparation : {loadedData.details.preparation}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <img className='h-96 w-full object-cover hidden lg:block' src={testImg} alt="test-details" />
                    <h3 className="font-semibold rounded-full my-10 text-center text-xl">Booking available slots : {loadedData.slots}</h3>
                    <div>

                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <form onSubmit={handleBooking}>
                                    <h3 className="text-2xl text-center mb-5 font-bold mt-5">{loadedData.title}</h3>
                                    <div className='grid grid-cols-2 gap-10'>
                                        <div>
                                            <label className='uppercase font-bold' htmlFor="date">Select Date</label>
                                            <select className='border-2 bg-sec text-white w-full' name="date" id="date">
                                                {loadedData.availableDates.map(data => <option
                                                    key={data}
                                                    className="flex items-center gap-5 font-bold"
                                                    value={data}
                                                >{data}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className='uppercase font-bold' htmlFor="time">Select Time</label>
                                            <select className='border-2 bg-sec text-white w-full' name="time" id="time">
                                                {loadedData.times.map(data => <option
                                                    key={data}
                                                    className="flex items-center gap-5 font-bold"
                                                    value={data}
                                                >{data}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-10 mt-5'>
                                        <div>
                                            <label className='uppercase font-bold' htmlFor="date">Put Coupon Code</label>
                                            <input onChange={(value) => setPromoValue(value)} placeholder='Coupon code here' className='border-2 px-2 w-full' type="text" name="code" id="code" />
                                        </div>
                                        <div>
                                            <h3 className='uppercase font-bold'>Price</h3>
                                            <p className='border-2 bg-sec pl-2 text-white w-full'>${disPrice}</p>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <div className='text-center'>
                                            <button className='btn bg-sec text-white hover:text-black'>Make payment</button>
                                        </div>
                                    </div>
                                </form>
                                <div className='text-center'>
                                    <button onClick={handlePromo} className='btn btn-sm mt-3 bg-prime'>Apply promo code</button>
                                </div>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                        {
                            userStatus.status === 'block' ? <>
                            <button className='btn btn-disabled w-full'>Book Now</button>
                            <p className='text-red-500 mt-5'>You are a blocked user. You can not book a service</p>
                            </> 
                            :
                            loadedData.slots > 0 ? <button onClick={() => document.getElementById('my_modal_5').showModal()} className="font-bold hover:bg-sec hover:text-white w-full transition ease-linear uppercase py-5 px-10 bg-prime rounded-full text-sec flex items-center justify-center text-xl gap-2">Book Now<FaArrowAltCircleRight></FaArrowAltCircleRight></button>
                                :
                                <button className="font-bold cursor-not-allowed w-full transition ease-linear uppercase py-5 px-10 bg-prime rounded-full text-sec flex items-center justify-center text-xl gap-2">Booked<FaArrowAltCircleRight></FaArrowAltCircleRight></button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetails;