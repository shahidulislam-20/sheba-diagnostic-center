import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAxiosSecure from "../hooks/useAxiosSecure";

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [userStatus, setUserStatus] = useState('');

    useEffect(() => {
        axiosSecure.get(`/user/${user?.email}`)
        .then(res => {
            setUserStatus(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [axiosSecure, user?.email])

    if(userStatus.status === 'block'){
        return <Navigate to="/"></Navigate>;
    }

    if(loading){
        return <p>Loading...</p>
    }

    if(user){
        return children;
    }

    return <Navigate to="/login" state={location.pathname}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrivateRoute;