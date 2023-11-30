import { useEffect, useState } from "react";
import TestCard from "../../../components/TestCard/TestCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Featured = () => {

    const axiosPublic = useAxiosPublic();
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axiosPublic.get('/tests')
            .then(res => setTests(res.data))
    }, [axiosPublic])

    return (
        <div className="max-w-7xl mx-auto py-20">
            <div className="text-center">
                <h3 className='text-prime font-bold text-4xl mb-10'>Featured Tests</h3>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 text-center">
                {
                    tests.slice(0, 6).map(test => <TestCard key={test.id} test={test}></TestCard>)
                }
            </div>
        </div>
    );
};

export default Featured;