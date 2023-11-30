import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllBanners = () => {

    const axiosSecure = useAxiosSecure();

    const { data: banner = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banner')
            return res.data;
        }
    })

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this banner",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/banner/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your banner has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });

    }

    const handleActive = id => {
        axiosSecure.put(`/banner/${id}`)
        .then(res => {
            if(res.data.result.modifiedCount && res.data.otherResult.modifiedCount){
                refetch();
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="py-20">
            <div className="mx-20">
                <h3 className="text-4xl font-bold uppercase text-center mb-10">All Banners</h3>
                <div className="bg-[#f6f6f6]">
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            {/* head */}
                            <thead className="bg-prime font-bold text-white">
                                <tr>
                                    <th>SL</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Discount Rate</th>
                                    <th>Coupon Code</th>
                                    <th>isActive</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    banner.map((data, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={data.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{data.title}</td>
                                        <td>{data.discountRate}</td>
                                        <td>{data.couponCode}</td>
                                        <td>{data.isActive ? 'Active' : 'Inactive'}</td>
                                        <th>
                                            {
                                                data.isActive ? <button className="btn cursor-not-allowed bg-gray-300 mr-2">Inactive</button>
                                                    :
                                                    <button onClick={() => handleActive(data._id)} className="btn bg-prime text-white hover:text-black mr-2">Active</button>
                                            }
                                            <button onClick={() => handleDelete(data._id)} className="btn bg-sec text-white hover:text-black">Delete</button>
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

export default AllBanners;