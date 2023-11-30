import { Link, NavLink } from "react-router-dom";
import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {

    const { logOut, user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                notify();
            })
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-tests">All Tests</NavLink></li>
        <li><NavLink to="/Blog">Blog</NavLink></li>
        {
            isAdmin ? <li><NavLink to="/dashboard/all-users">Admin Dashboard</NavLink></li>
            : user &&
            <li><NavLink to="/dashboard/my-profile">User Dashboard</NavLink></li>
        }
    </>

    const notify = () => toast.success("Log out successful", { position: "top-center", autoClose: 1000 });

    return (
        <div>
            <div className="navbar bg-base-100 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/">
                        <div>
                            <h2 className="text-3xl uppercase font-bold tracking-widest text-prime">Sheba</h2>
                            <h3 className="font-semibold text-sec">Diagnostic Center</h3>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <div className="flex gap-2 items-center mr-2">
                                <img className="h-11 w-11 rounded-full" src={user?.photoURL} alt="user" />
                                <h3 className="tex-xs font-bold uppercase">{user?.displayName}</h3>
                            </div>
                            <button onClick={handleLogOut} className="btn bg-prime uppercase font-bold hover:bg-sec text-white">Log Out</button>
                        </>
                            :
                            <>
                                <Link to="/login">
                                    <button className="mr-2 btn bg-prime uppercase font-bold hover:bg-sec text-white">Log In</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn bg-prime uppercase font-bold hover:bg-sec text-white">Register</button>
                                </Link>
                            </>
                    }
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Navbar;