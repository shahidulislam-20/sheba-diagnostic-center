import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";


const AllUsers = () => {

    const [modalData, setModalData] = useState({})
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleActive = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to active this user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, active!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`, { status: 'active' })
                    .then(result => {
                        refetch();
                        console.log(result.data)
                        Swal.fire({
                            title: "Activated",
                            text: "User activated successful",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }

    const handleBlock = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to block this user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, block!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`, { status: 'block' })
                    .then(result => {
                        refetch();
                        console.log(result.data)
                        Swal.fire({
                            title: "Blocked",
                            text: "User blocked successful",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });

    }

    const handleRole = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user as admin",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`, { isAdmin: true })
                    .then(result => {
                        refetch();
                        console.log(result.data)
                        Swal.fire({
                            title: "Role as Admin",
                            text: "Make admin successful",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }
    const handleModal = (data) => {
        setModalData(data)
    }

    return (
        <div>
            <h3 className="text-4xl uppercase text-center mb-10 mt-20 font-bold">All users</h3>
            <div className="bg-[#f6f6f6] mx-20">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-prime uppercase font-bold text-center">
                            <tr>
                                <th>SL</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={data?.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>{data.name}</th>
                                    <td>{data.email}</td>
                                    <td>
                                        {
                                            data?.isAdmin ? <p className="font-bold uppercase">Admin</p> : <button onClick={() => handleRole(data._id)} className="btn bg-prime text-xl text-white hover:text-sec"><FaUsers></FaUsers></button>
                                        }
                                    </td>
                                    <th>{data.status}</th>
                                    <th>
                                        <span onClick={() => handleModal(data)}><button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn bg-prime text-white hover:text-black mr-2">See Info</button></span>
                                        {
                                            data.status === 'active'
                                                ?
                                                <button onClick={() => handleBlock(data._id)} className="btn bg-sec text-white hover:text-black">Block</button>
                                                :
                                                <button onClick={() => handleActive(data._id)} className="btn bg-sec text-white hover:text-black">Active</button>
                                        }
                                    </th>
                                </tr>)
                            }

                        </tbody>
                    </table>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <img className="w-20 h-20 rounded-full mx-auto mt-10" src={modalData?.photo} alt="" />
                            <div className="text-center font-bold space-y-3 text-xl mt-10">
                                <h3>Name : {modalData?.name}</h3>
                                <h3>Email : {modalData?.email}</h3>
                                <h3>Blood Group : {modalData?.bloodGroup}</h3>
                                <h3>District : {modalData?.district}</h3>
                                <h3>Upazila : {modalData?.upazila}</h3>
                                <h3>Status : {modalData?.status}</h3>
                            </div>
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
    );
};

export default AllUsers;