// import { FaGoogle } from 'react-icons/fa';
import loginImg from '../../assets/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from '../../hooks/useAdmin';


const Login = () => {

    const { logIn, loading } = useContext(AuthContext);
    const [isAdmin ] = useAdmin();
    const navigate = useNavigate();

    const notify = () => toast.success("Log in successful", { position: "top-center", autoClose: 1000 });
    const logInError = (message) => toast.error(`${message}`, { position: "top-center", autoClose: 1000 });

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        logIn(email, password)
            .then(result => {
                console.log(result);
                notify();
                {   !loading &&
                    isAdmin ? navigate('/dashboard/all-users')
                    :
                    navigate('/dashboard/my-profile')
                }
                // {location.state?navigate(location.state):navigate('/')}
            })
            .catch(error => {
                logInError(error.message);
            })
    }


    return (
        <div style={{ background: `url(${loginImg}) no-repeat center/cover` }}>
            <div className='bg-black bg-opacity-50 h-full w-full py-40'>
                <div className='bg-black w-96 mx-auto p-10 rounded-xl bg-opacity-80'>
                    <h3 className='text-white text-4xl font-bold text-center mb-10'>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className='flex flex-col'>
                            <input className='py-2 px-5 mb-5 rounded-full' type="email" name="email" placeholder='Email' />
                            <input className='py-2 px-5 mb-5 rounded-full' type="password" name="password" placeholder='Password' />
                            <input className='text-white bg-sec w-28 mx-auto py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-sec' type="submit" value="Login" />
                        </div>
                        <ToastContainer />
                    </form>
                    {/* <div className="divider divider-neutral text-white">OR</div>
                    <button onClick={handleGoogleLogin} className='flex items-center justify-center uppercase text-white bg-sec py-2 rounded-full font-bold cursor-pointer w-full hover:bg-white hover:text-sec'><FaGoogle className='mr-2'></FaGoogle> Login with Google</button> */}
                    <p className='text-white text-center mt-5'>New Here? Please <Link to="/register" className='text-prime underline'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;