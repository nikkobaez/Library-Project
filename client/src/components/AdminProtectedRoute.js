import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminProtectedRoute = ({ children }) => {
    const { currentStatus } = useContext(AuthContext);

    if (currentStatus !== "Admin") {
        return <Navigate to='/admin-login' />;
    }

    return children;
};

export default AdminProtectedRoute;