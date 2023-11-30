import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";


const MyProfile = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/user/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setUserData(res.data);
            })
    }, [axiosSecure, user?.email])


    return (
        <div className="mt-20">
            <div className="bg-[#f6f6f6] w-[800px] mx-auto p-20 rounded-lg shadow-2xl">
                <div>
                    <img className="h-28 w-28 mx-auto rounded-full mb-10" src={userData.photo} alt="" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <h3 className="uppercase font-semibold">Name : {userData.name}</h3>
                    <h3 className="uppercase font-semibold">Email : {userData.email}</h3>
                    <h3 className="uppercase font-semibold">Blood Group : {userData.bloodGroup}</h3>
                    <h3 className="uppercase font-semibold">District : {userData.district}</h3>
                    <h3 className="uppercase font-semibold">Upazila : {userData.upazila}</h3>
                    <p className="uppercase font-semibold">Status : {userData.status}</p>
                </div>
                <div className="text-center mt-10">
                    <Link to="/dashboard/update-profile">
                        <button className="btn uppercase bg-prime font-bold">Update Profile</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;