import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from "./ChatPage.module.scss";
import { ROUTES } from '../../../../utils/constants';
import { Form, Formik } from 'formik';
import Input from '../../../common/Formik/Input/Input';
import { debouncing } from '../../../../utils/utils';

const ChatPage = () => {
    const handleSearch = e => {
        console.log('e.target.value', e.target.value);
    }
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
                            [1, 2].map(item => (
                                <li key={item}>
                                    <NavLink to={ROUTES.INBOX_USER.replace(":id", item)}>
                                        <img src={"https://api.dicebear.com/7.x/adventurer/svg?seed=ladjsf"} alt="" />
                                        <div>
                                            <h4>Username</h4>
                                            <p>last message</p>
                                        </div>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </aside>
                <div className={styles.chat}>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default ChatPage;