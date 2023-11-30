import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className="grid grid-cols-4">
            <div className="min-h-screen bg-sec text-white px-10">
                <div className="text-center py-10">
                    <h2 className="text-3xl uppercase font-bold tracking-widest text-prime">Sheba</h2>
                    <h3 className="font-semibold text-white">Diagnostic Center</h3>
                </div>
                <div className="flex flex-col gap-5">
                    {
                        isAdmin ? <>
                            <div className="divider divider-info"></div>
                            <h3 className="text-bold text-center uppercase">Admin Dashboard</h3>
                            <div className="divider divider-info"></div>
                            <NavLink to="/dashboard/all-users">All Users</NavLink>
                            <NavLink to="/dashboard/add-test">Add Test</NavLink>
                            <NavLink to="/dashboard/all-tests">All Tests</NavLink>
                            <NavLink to="/dashboard/add-banner">Add Banner</NavLink>
                            <NavLink to="/dashboard/all-banners">All Banners</NavLink>
                            <NavLink to="/dashboard/reservation">Reservation</NavLink>
                        </>
                            :
                            <>
                                <div className="divider divider-info"></div>
                                <h3 className="text-bold text-center uppercase">User Dashboard</h3>
                                <div className="divider divider-info"></div>
                                <NavLink to="/dashboard/my-profile">My Profile</NavLink>
                                <NavLink to="/dashboard/my-appoinments">My Upcoming Appointments</NavLink>
                                <NavLink to="/dashboard/test-results">Test Results</NavLink>
                            </>
                    }
                </div>
                <div className="divider divider-info"></div>
                <div className="flex flex-col gap-5 uppercase">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/all-tests">All Tests</NavLink>
                </div>
            </div>
            <div className="col-span-3">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;