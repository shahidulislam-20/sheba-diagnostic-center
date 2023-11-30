import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin();

    if(loading || isAdminLoading){
        return <p>Loading...</p>
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to="/login" state={location.pathname}></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default AdminRoute;