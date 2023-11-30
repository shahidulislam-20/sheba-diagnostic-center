import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AllTest = () => {

    const axiosSecure = useAxiosSecure();

    const { data: tests = [], refetch } = useQuery({
        queryKey: ['admin-allTests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tests')
            return res.data;
        }
    })

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this test",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/tests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your test has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        } 
                    })
            }
        });


    }

    return (
        <div className="py-20">
            <div>
                <h3 className="text-4xl text-center font-bold uppercase mb-10">All Tests</h3>
                <div className="mx-20 bg-[#f6f6f6]">
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            {/* head */}
                            <thead className="bg-prime font-bold uppercase text-white">
                                <tr>
                                    <th>SL</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Available Slots</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tests.map((data, index) => <tr key={data._id}>
                                        <th>{index + 1}</th>
                                        <td>{data.title}</td>
                                        <td>{data.details.price}</td>
                                        <td>{data.slots}</td>
                                        <th>
                                            <Link to={`/dashboard/update-test/${data._id}`}>
                                                <button className="btn bg-prime font-bold text-white hover:text-black mr-2">Update</button>
                                            </Link>
                                            <button onClick={() => handleDelete(data._id)} className="btn bg-sec font-bold text-white hover:text-black">Delete</button>
                                        </th>
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

export default AllTest;