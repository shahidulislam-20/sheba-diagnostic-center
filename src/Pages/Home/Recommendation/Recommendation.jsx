import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Recommendation = () => {

    const axiosPublic = useAxiosPublic();
    const [recommend, setRecommend] = useState([]);

    useEffect(() => {
        axiosPublic.get('/recommendation')
        .then(res => setRecommend(res.data))
    }, [axiosPublic])

    return (
        <div className='bg-sec'>
            <div className='max-w-7xl mx-auto py-20 text-center'>
                <div>
                    <h3 className='text-prime font-bold text-4xl'>Our Recommendation</h3>
                    <p className='font-bold text-white mb-14'>Suggested by healthcare professionals</p>
                </div>
                <div>
                    <Swiper 
                    slidesPerView={2}
                    navigation={true} 
                    modules={[Navigation]}
                    breakpoints={{
                        360: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 1,
                        },
                        1024: {
                          slidesPerView: 2,
                        },
                      }} 
                    className="mySwiper">
                        {
                            recommend.map(data => <SwiperSlide
                            key={data.id}
                            >
                                <div className='bg-white p-10 text-center mx-10 rounded-lg'>
                                    <FaQuoteLeft className='text-5xl text-sec mx-auto'></FaQuoteLeft>
                                    <h3 className='text-prime text-3xl font-bold mt-10 mb-5'>{data.type}</h3>
                                    <p className='text-semibold mb-5'>{data.content}</p>
                                    <h4 className='font-bold uppercase text-sec'>- {data.author}</h4>
                                    <h4 className='text-sm font-bold'>{data.date}</h4>
                                </div>
                            </SwiperSlide>)
                        }
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Recommendation;