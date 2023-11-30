import { useEffect, useState } from "react";


const Promotion = () => {

    const [promotion, setPromotion] = useState([]);

    useEffect(() => {
        fetch('promotion.json')
            .then(res => res.json())
            .then(data => {
                setPromotion(data)
            })
    }, [])

    console.log(promotion)

    return (
        <div className="bg-[#ccc] p-20">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-4xl font-bold text-center text-prime mb-10">Promotional Event</h3>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                    {
                        promotion.map((data, index) => <div key={index}>
                            <div className="relative">
                                <img className="w-full" src={data.image} alt="" />
                                <div className="text-center flex justify-evenly flex-col p-10 absolute top-0 left-0 h-full w-full bg-black bg-opacity-50">
                                    <h3 className="uppercase font-bold text-4xl text-white">{data.test_name}</h3>
                                    <p className="font-bold text-2xl uppercase py-2 rounded-full text-white bg-sec">Upto {data.discount_percentage}% discount</p>
                                    <div className="flex justify-between font-bold uppercase text-white">
                                    <p>Valid from : {data.valid_from}</p>
                                    <p>Valid until : {data.valid_until}</p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Promotion;