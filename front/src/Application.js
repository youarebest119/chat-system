import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homelayout from './components/layouts/Homelayout/Homelayout';
import Login from './components/pages/public/Login/Login';
import Register from './components/pages/public/Register/Register';
import ChatPage from './components/pages/private/ChatPage/ChatPage';
import { ROUTES } from './utils/constants';
import UserInbox from './components/pages/private/UserInbox/UserInbox';
import AuthGaurd from './components/gaurds/AuthGaurd';
import NoGaurd from './components/gaurds/NoGaurd';
import AuthLayout from './components/layouts/AuthLayout/AuthLayout';

const Application = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <NoGaurd><Homelayout /></NoGaurd>,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: ROUTES.REGISTER,
                    element: <Register />,
                },
            ]
        },
        {
            path: ROUTES.AUTH,
            element: <AuthGaurd><AuthLayout /></AuthGaurd>,
            children: [
                {
                    path: ROUTES.INBOX,
                    element: <><ChatPage /></>,
                    children: [
                        {
                            path: ROUTES.INBOX_USER,
                            element: <UserInbox />,
                        }
                    ],
                }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Application;