import React, { useEffect, useState } from 'react';
import styles from "./AuthLayout.module.scss";
import { Outlet, useNavigate } from 'react-router-dom';
import { AXIOS_GET } from '../../../utils/axios';
import { API_URL, ROUTES } from '../../../utils/constants';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetDateFromStr } from '../../../utils/utils';
import Button from '../../common/Button/Button';
import { setUser } from '../../../redux/features/user.slice';

const AuthLayout = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async () => {
        let response = await AXIOS_GET(API_URL.USER.MY_PROFILE);
        dispatch(setUser({ ...response.data.data }));
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate(ROUTES.LOGIN)
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            <header className='border-bottom'>
                <Container>
                    <div className='py-3 d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center gap-3'>
                            <img
                                src={user.profilePic.url + user.profilePic.id} alt=""
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    padding: "6px",
                                    borderRadius: "50%",
                                    backgroundColor: "#ccc",
                                }}
                            />
                            <div>
                                <h2>{user.username}</h2>
                                <span>{GetDateFromStr(user.createdAt).formattedDate()}</span>
                            </div>
                        </div>
                        <div>
                            <Button onClick={handleLogout}>Logout</Button>
                        </div>
                    </div>
                </Container>
            </header>
            <Outlet />
        </>
    )
}

export default AuthLayout
