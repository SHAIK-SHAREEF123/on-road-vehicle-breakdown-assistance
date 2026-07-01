import React from 'react'

const ProtectedRoute = ({children, allowedRole}) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token) {
        return <Navigate to="/login" />
    }

    if(allowedRole && allowedRole!=role) {
        return <Navigate to="/" />
    }

    return children;
}

export default ProtectedRoute;
