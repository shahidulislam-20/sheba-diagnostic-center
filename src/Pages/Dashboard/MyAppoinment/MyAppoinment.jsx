import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const MyAppoinment = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: testData = [], isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'appoinments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data;
        }
    })

    if (isLoading) {
        return <p>Loading...</p>;
    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/payment/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Canceled!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="px-20 py-28">
            <div>
                <h3 className="text-4xl text-center uppercase font-bold mb-5">My Upcoming Appoinments</h3>
                <div className="bg-[#f6f6f6]">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead className="bg-prime uppercase font-bold">
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Duration</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    testData && testData.map((data, index) => <tr key={data._id}>
                                        <th>{index + 1}</th>
                                        <td>{data.title}</td>
                                        <td>{data.date}</td>
                                        <td>{data.time}</td>
                                        <td>{data.duration}</td>
                                        <td>
                                            <button onClick={() => handleDelete(data._id)} className="btn bg-sec text-white hover:text-black">Cancel</button>
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

export default MyAppoinment;