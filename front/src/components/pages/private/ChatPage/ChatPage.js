import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styles from "./ChatPage.module.scss";
import { API_URL, ROUTES } from '../../../../utils/constants';
import { Form, Formik } from 'formik';
import Input from '../../../common/Formik/Input/Input';
import { debouncing } from '../../../../utils/utils';
import NoChats from '../NoChats/NoChats';
import Shimmer from '../../../common/Shimmer/Shimmer';
import { useSelector } from 'react-redux';
import { AXIOS_GET } from '../../../../utils/axios';

const ChatPage = () => {
    const { loading } = useSelector(state => state.loading);
    const [inboxUsers, setInboxUsers] = useState(null);
    const [users, setUsers] = useState(null);
    const { id } = useParams();
    const handleSearch = e => {
        console.log('e.target.value', e.target.value);
    }
    const getUsers = async () => {
        let response = await AXIOS_GET(`${API_URL.USER.INBOX_USERS}?page=${1}`);
        setInboxUsers(response.data.data);
        response = await AXIOS_GET(`${API_URL.USER.USERS}?page=${1}`)
        setUsers(response.data.data);
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <>
            <main className={styles.user_inbox}>
                <aside>
                    <Formik
                        initialValues={{ search: "" }}
                        onSubmit={() => { }}
                    >
                        <Form onChange={debouncing((e) => handleSearch(e))}>
                            <Input placeholder="Search" name="search" />
                        </Form>
                    </Formik>
                    <ul>
                        {
                            loading ?
                                <>
                                    {
                                        Array.from({ length: 5 }).map((item, index) => (
                                            <li key={index}>
                                                <Shimmer fluid height="50px" />
                                            </li>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    {
                                        inboxUsers &&
                                        inboxUsers.length > 0 &&
                                        inboxUsers.map(item => {
                                            console.log('item', item);
                                            return (
                                                <li key={item._id}>
                                                    <NavLink to={ROUTES.INBOX_USER.replace(":id", item._id)}>
                                                        <img src={item.profilePic.url + item.profilePic.id} alt="" />
                                                        <div>
                                                            <h4>{item.username}</h4>
                                                            {/* <p>{item.message[0].message}</p> */}
                                                        </div>
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                    <hr />
                                    {
                                        users &&
                                        users.length > 0 &&
                                        <>
                                            <h3>All</h3>
                                            {
                                                users.map(item => (
                                                    <li key={item._id}>
                                                        <NavLink to={ROUTES.INBOX_USER.replace(":id", item._id)}>
                                                            <img src={item.profilePic.url + item.profilePic.id} alt="" />
                                                            <div>
                                                                <h4>{item.username}</h4>
                                                            </div>
                                                        </NavLink>
                                                    </li>
                                                ))
                                            }
                                        </>
                                    }
                                </>
                        }
                    </ul>
                </aside>
                <div className={styles.chat}>
                    {id ? <Outlet /> : <NoChats />}
                </div>
            </main>
        </>
    )
}

export default ChatPage;