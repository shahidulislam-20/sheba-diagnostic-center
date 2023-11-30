import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";


const Reservation = () => {

    const axiosSecure = useAxiosSecure();
    const [testId, setTestId] = useState('');

    const { data: reservation = [], refetch } = useQuery({
        queryKey: ['users-reservation'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reservation')
            return res.data;
        }
    })

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this reservation!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/payment/${id}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your reservation has been cancelled.",
                            icon: "success"
                        });
                        refetch();
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
        });
    }

    

    const handleSend = e => {
        e.preventDefault();
        const reportLink = e.target.report.value;
        const id = testId;

        axiosSecure.put(`/reservation/${id}`, { reportLink })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleReport = (data) => {
        setTestId(data._id);
    }
    // console.log(reportId);

    return (
        <div className="py-20">
            <div>
                <h3 className="text-4xl font-bold uppercase text-center mb-10">All reservation of users</h3>
                <div className="mx-10 bg-[#f6f6f6]">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-prime font-bold text-white text-center">
                                <tr>
                                    <th>SL</th>
                                    <th>Title</th>
                                    <th>User email</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reservation.map((data, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{data.title}</td>
                                        <td>{data.email}</td>
                                        <td>${data.price}</td>
                                        <td>{data.date}</td>
                                        <td>
                                            {
                                                data.status === 'pending' ? <p className="text-blue-500">{data.status}</p> : <p className="text-green-500">{data.status}</p>
                                            }
                                        </td>
                                        <td>
                                            <span onClick={() => handleReport(data)}><button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn bg-prime mr-2 text-white hover:text-black">Submit</button></span>
                                            <button onClick={() => handleDelete(data._id)} className="btn bg-sec text-white hover:text-black">Cancel</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <form onSubmit={handleSend}>
                                    <h3>Send report link</h3>
                                    <input className="w-full border p-2 mt-2 mb-5" type="text" name="report" placeholder="https://www.reportlink.com" />
                                    <input className="btn bg-sec text-white hover:bg-prime hover:text-black" type="submit" value="Send" />
                                </form>
                                
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;