import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserProtectedRoute = ({ children }) => {
    const { currentStatus } = useContext(AuthContext);

    if (currentStatus !== "User") {
        return <Navigate to='/user-login' />;
    }

    return children;
};

export default UserProtectedRoute;