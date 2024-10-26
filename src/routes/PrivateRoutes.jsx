import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (user) {
        return children;
    }
    // return <Navigate state={location.pathname} to="/login"></Navigate>;
    return <Navigate to="/login" state={{ from: location }} ></Navigate>;

};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
    children: PropTypes.node,
}