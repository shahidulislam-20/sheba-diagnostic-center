// import { FaGoogle } from 'react-icons/fa';
import registerImg from '../../assets/register.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const image_hostin_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;

const Register = () => {

    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const [distList, setDisList] = useState([]);
    const [upazila, setUpazila] = useState([]);
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const notify = () => toast.success("Register successful", { position: "top-center", autoClose: 1000 });
    const registerError = (message) => toast.error(`${message}`, { position: "top-center", autoClose: 1000 });

    useEffect(() => {
        fetch('district.json')
            .then(res => res.json())
            .then(data => setDisList(data.sort()))
    }, [])

    useEffect(() => {
        fetch('upazila.json')
            .then(res => res.json())
            .then(data => setUpazila(data.upazilas))
    }, [])


    const onSubmit = async (data) => {
        console.log(data.photo[0])
        const imageFile = { image: data.photo[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            if (data.password !== data.confirmPass) {
                setError('Password does not match')
                return;
            } else { setError('') }

            const profileInfo = {
                name: data.name,
                email: data.email,
                photo: res.data.data.display_url,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                status: 'active'
            }

            createUser(data.email, data.password)
                .then(result => {
                    console.log(result)
                    const name = data.name;
                    const photo = res.data.data.display_url;
                    updateUserProfile(name, photo)
                        .then(() => {

                            axiosPublic.post('/users', profileInfo)
                                .then(result => {
                                    console.log(result.data)
                                    notify();
                                    logOut()
                                    navigate('/login');
                                })
                                .catch(error => {
                                    console.log(error)
                                })

                        })
                        .catch(error => {
                            registerError(error.message);
                        })
                })
                .catch(error => {
                    registerError(error.message);
                })
        }
    }

    return (
        <div style={{ background: `url(${registerImg}) no-repeat center/cover` }} className=''>
            <div className='bg-black bg-opacity-50 h-full w-full py-40'>
                <div className='bg-black lg:w-1/2 w-full mx-auto p-10 rounded-xl bg-opacity-80'>
                    <h3 className='text-white text-4xl font-bold text-center mb-10'>Register</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className='grid lg:grid-cols-2 lg:gap-10 gap-5'>
                                <div>
                                    <label className='text-white' htmlFor="name">Name</label>
                                    <input className='py-2 px-5 rounded-lg w-full' type="text" {...register("name")} id="name" placeholder='Name' />
                                </div>
                                <div>
                                    <label className='text-white' htmlFor="email">Email</label>
                                    <input className='py-2 px-5 rounded-lg w-full' type="email" {...register("email")} id="email" placeholder='Email' />
                                </div>
                            </div>

                            <div className='grid lg:grid-cols-2 gap-5 lg:gap-10 my-5'>
                                <div>
                                    <label className='text-white' htmlFor="name">Blood Group</label>
                                    <select {...register("bloodGroup")} className='py-2 px-5 rounded-lg w-full'>
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

                            <div className='grid lg:grid-cols-2 gap-5 lg:gap-10 mt-5 mb-10'>
                                <div>
                                    <label className='text-white' htmlFor="password">Password</label>
                                    <input className='py-2 px-5 rounded-lg w-full' type="password" {...register("password")} id="password" placeholder='Password' />
                                    <p className='text-red-500 mt-2'>{error}</p>
                                </div>
                                <div>
                                    <label className='text-white' htmlFor="confirm">Confirm Password</label>
                                    <input className='py-2 px-5 rounded-lg w-full' type="password" {...register("confirmPass")} id="confirm" placeholder='Confirm Password' />
                                </div>
                            </div>

                            <ToastContainer />
                            <input className='text-white bg-sec w-full mx-auto py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-sec' type="submit" value="Register" />

                        </div>
                    </form>
                    {/*<div className="divider divider-neutral text-white">OR</div>
                    <button onClick={handleGoogleLogin} className='flex w-full items-center mx-auto justify-center uppercase text-white bg-sec py-2 rounded-full font-bold cursor-pointer hover:bg-white hover:text-sec'><FaGoogle className='mr-2'></FaGoogle> Login with Google</button>*/}
                    <p className='text-white text-center mt-5'>Already have an account ? Please <Link to="/login" className='text-prime underline'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;