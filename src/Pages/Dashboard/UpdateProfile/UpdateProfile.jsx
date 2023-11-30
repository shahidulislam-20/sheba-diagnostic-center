import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

const image_hostin_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;


const UpdateProfile = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [distList, setDisList] = useState([]);
    const [upazila, setUpazila] = useState([]);
    console.log(userData?.name);

    const { register, handleSubmit } = useForm();


    const notify = () => toast.success("Profile update successful", { position: "top-center", autoClose: 1000 });

    useEffect(() => {
        fetch('/district.json')
            .then(res => res.json())
            .then(data => setDisList(data.sort()))
    }, [])

    useEffect(() => {
        fetch('/upazila.json')
            .then(res => res.json())
            .then(data => setUpazila(data.upazilas))
    }, [])

    useEffect(() => {
        axiosSecure.get(`/user/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setUserData(res.data);
            })
    }, [axiosSecure, user?.email])

    if (!userData?.name) {
        return <p>Loading...</p>
    }
    const onSubmit = async (data) => {
        console.log(data.photo[0])
        if (typeof data.photo === 'object') {
            const imageFile = { image: data.photo[0] };
            const res = await axiosSecure.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            data.image = res.data.data.display_url;
        }
        console.log(data.photo[0])
        const imageFile = { image: data.photo[0] };
        const res = await axiosSecure.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const profileInfo = {
            name: data.name,
            photo: res.data.data.display_url,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila,
        }
        console.log(profileInfo)
        axiosSecure.patch(`/user/${userData._id}`, profileInfo)
            .then(res => {
                console.log(res.data)
                notify();
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="mx-28 mt-20">
            <div className="bg-[#f6f6f6] px-10 py-14">
                <h3 className="text-center mb-10">All field required</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='grid lg:grid-cols-2 lg:gap-10 gap-5'>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input className='py-2 px-5 rounded-lg w-full' type="text" {...register("name")} id="name" placeholder='Name' />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input disabled defaultValue={userData?.email} className='py-2 px-5 rounded-lg w-full' type="email" {...register("email")} id="email" placeholder='Email' />
                            </div>
                        </div>

                        <div className='grid lg:grid-cols-2 gap-5 lg:gap-10 my-5'>
                            <div>
                                <label className='text-white' htmlFor="name">Blood Group</label>
                                <select {...register("bloodGroup",)} className='py-2 px-5 rounded-lg w-full'>
                                    <option disabled>-- Select a group --</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>

                                </select>
                            </div>
                            <div>
                                <label className='text-white block' htmlFor="photo">Avatar</label>
                                <input className='py-2 px-5 rounded-lg file-input file-input-bordered w-full' type="file" {...register("photo")} id="photo" />
                            </div>
                        </div>

                        <div className='grid lg:grid-cols-2 gap-5 lg:gap-10'>
                            <div>
                                <label className='text-white' htmlFor="name">District</label>
                                <select {...register("district")} className='py-2 px-5 rounded-lg w-full'>
                                    <option value="">-- Select a district --</option>
                                    {
                                        distList.map((data, idx) => <option key={idx} value={data}>{data}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <label className='text-white' htmlFor="photo">Upazila</label>
                                <select {...register("upazila")} className='py-2 px-5 rounded-lg w-full'>
                                    <option value="">-- Select a upazila --</option>
                                    {
                                        upazila.map((data, idx) => <option key={idx} value={data.name}>{data.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>

                        <ToastContainer />
                        <input className='text-white mt-10 bg-sec w-full mx-auto py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-sec' type="submit" value="Update" />

                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;