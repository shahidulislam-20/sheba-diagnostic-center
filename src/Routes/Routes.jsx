import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllTests from "../Pages/AllTests/AllTests";
import TestDetails from "../Pages/TestDetails/TestDetails";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Payment from "../Pages/Payment/Payment";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyAppoinment from "../Pages/Dashboard/MyAppoinment/MyAppoinment";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddTest from "../Pages/Dashboard/AddTest/AddTest";
import AllTest from "../Pages/Dashboard/AllTest/AllTest";
import UpdateTest from "../Pages/Dashboard/UpdateTest/UpdateTest";
import AddBanner from "../Pages/Dashboard/AddBanner/AddBanner";
import AllBanners from "../Pages/Dashboard/AllBanners/AllBanners";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import TestResults from "../Pages/Dashboard/TestResults/TestResults";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Blog from "../Pages/Blog/Blog";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/all-tests',
                element: <AllTests></AllTests>
            },
            {
                path: '/test-details/:id',
                element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/tests/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "my-profile",
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: "my-appoinments",
                element: <PrivateRoute><MyAppoinment></MyAppoinment></PrivateRoute>
            },
            {
                path: "test-results",
                element: <PrivateRoute><TestResults></TestResults></PrivateRoute>
            },
            {
                path: "update-profile",
                element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
            },

            // admin route
            {
                path: "all-users",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "add-test",
                element: <AdminRoute><AddTest></AddTest></AdminRoute>
            },
            {
                path: "all-tests",
                element: <AdminRoute><AllTest></AllTest></AdminRoute>
            },
            {
                path: "update-test/:id",
                element: <AdminRoute><UpdateTest></UpdateTest></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/tests/${params.id}`)
            },
            {
                path: "add-banner",
                element: <AdminRoute><AddBanner></AddBanner></AdminRoute>
            },
            {
                path: "all-banners",
                element: <AdminRoute><AllBanners></AllBanners></AdminRoute>
            },
            {
                path: "reservation",
                element: <AdminRoute><Reservation></Reservation></AdminRoute>
            }
        ]
    }
]);