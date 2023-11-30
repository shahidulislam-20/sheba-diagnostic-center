import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const TestResults = () => {

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/test-results/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setReportData(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, [axiosSecure, user?.email])

    return (
        <div className="py-20">
            <div className="mx-20">
                <h3 className="text-4xl font-bold text-center uppercase mb-10">My test results</h3>
                <div className="bg-[#f6f6f6]">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-prime font-bold text-white">
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reportData.map((data, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{data.title}</td>
                                        <td>{data.date}</td>
                                        <td>{data.time}</td>
                                        <td>{data.status}</td>
                                        <td>
                                            <Link to={data.report}>
                                                <button className="btn bg-prime hover:bg-sec text-white font-bold">Download</button>
                                            </Link>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResults;