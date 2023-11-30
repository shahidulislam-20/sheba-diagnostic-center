import { useEffect, useState } from 'react';
import SecondaryBtn from '../../../components/Button/SecondaryBtn';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Banner = () => {

    const axiosPublic = useAxiosPublic();
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        axiosPublic.get('/banner')
            .then(res => setBannerData(res.data))
    }, [axiosPublic])


    return (
        <div>
            {
                bannerData.filter(data => data.isActive === true).map(banner => <div
                    className='h-[700px]'
                    key={banner._id}
                >
                    <div className='relative'>
                        <img className='h-[700px] object-cover w-full' src={banner.image} alt="banner-image" />
                        <div className='absolute top-0 left-0 lg:pl-20 lg:pt-52 pt-32 text-center lg:text-left h-full w-full bg-black bg-opacity-50'>
                            <h3 className='lg:text-5xl text-4xl uppercase mb-5 font-niramit text-white font-bold'>{banner.title}</h3>
                            <p className='font-bold text-prime lg:text-7xl text-5xl uppercase'>Up to {banner.discountRate}% off</p>
                            <p className='text-white text-2xl'>{banner.text}</p>
                            <p className='mt-5 mb-10 rounded-full mx-auto lg:mx-0 uppercase bg-prime w-96 py-2 text-white text-center text-2xl font-bold'>Coupon code : <span className='text-sec'>{banner.couponCode}</span></p>
                            <Link to="/all-tests" className='flex justify-center lg:justify-normal'><SecondaryBtn text="All tests"></SecondaryBtn></Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Banner;