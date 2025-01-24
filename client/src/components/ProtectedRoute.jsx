// it uses AuthContext to protect sensibles routes as Dashboard
import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    
    return children;
};

export default ProtectedRoute;
