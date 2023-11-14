import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const AuthGaurd = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={ROUTES.LOGIN} />
    }
    return children;
}

export default AuthGaurd;
