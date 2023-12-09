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
    const [pageNumber, setPageNumber] = useState(1);
    const [paginationData, setPaginationData] = useState([]);

    useEffect(() => {
        axiosPublic.get('/tests')
            .then(res => {
                const remaining = res.data.filter(dateData => new Date(`${dateData.availableDates[0]}`).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0));
                setTestData(remaining)
            })

    }, [axiosPublic])

    useEffect(() => {
        axiosPublic.get(`/test/${pageNumber}`)
            .then(res => {
                const remaining = res.data.filter(dateData => new Date(`${dateData.availableDates[0]}`).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0));
                setPaginationData(remaining)
            })
    }, [axiosPublic, pageNumber])



    // pagination
    let arr = [];
    for (let i = 1; i <= Math.ceil(testData.length / 6); i++) {
        arr.push(i);
    }


    const handlePagination = number => {
        setPageNumber(number)
    }

    return (
        <div className="max-w-7xl mx-auto py-20">
            <Helmet>
                <title>All Tests | Sheba Diagnostic Center</title>
            </Helmet>
            <div className="flex gap-5 justify-center bg-prime p-5 rounded-full mx-auto items-center my-10">
                <h3 className="font-bold uppercase text-white">Filter by Date :</h3>
                <DatePicker className="outline-0 py-1 pl-5 rounded-full" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 text-center">
                {
                    paginationData.filter(data => {
                        if (startDate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
                            return data;
                        } else {
                            const filtered = data.availableDates.map(testDate => new Date(testDate).setHours(0, 0, 0, 0));
                            const selectedDate = new Date(startDate).setHours(0, 0, 0, 0);
                            return (filtered.includes(selectedDate))
                        }
                    }).map((test, index) => <TestCard key={index} test={test}></TestCard>)
                }
            </div>
            <div className="flex justify-center mt-20">
                {
                    arr.map(number => <input onClick={() => handlePagination(number)} key={number} className="join-item btn btn-square" type="radio" name="options" aria-label={number} defaultChecked={number === 1} />)
                }
            </div>
        </div>
    );
};

export default AllTests;