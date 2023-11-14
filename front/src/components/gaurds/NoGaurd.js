import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const NoGaurd = ({ children }) => {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to={ROUTES.INBOX} />
    }
    return children;
}

export default NoGaurd
