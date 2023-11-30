import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TestCard from "../../components/TestCard/TestCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const AllTests = () => {

    const axiosPublic = useAxiosPublic();
    const [testData, setTestData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        axiosPublic.get('/tests')
            .then(res => {
                const remaining = res.data.filter(dateData => new Date(`${dateData.availableDates[0]}`).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0));
                setTestData(remaining)
            })

    }, [axiosPublic])


    return (
        <div className="max-w-7xl mx-auto py-20">
            <Helmet>
                <title>All Tests | Sheba Diagnostic Center</title>
            </Helmet>
            <div className="flex gap-5 justify-center bg-prime p-5 w-[500px] rounded-full mx-auto items-center my-10">
                <h3 className="font-bold uppercase text-white">Filter by Date :</h3>
                <DatePicker className="outline-0 py-1 rounded-full" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 text-center">
                {
                    testData.map(test => <TestCard key={test.id} test={test}></TestCard>)
                }
            </div>
        </div>
    );
};

export default AllTests;