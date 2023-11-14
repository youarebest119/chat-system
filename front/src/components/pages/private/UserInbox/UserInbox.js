import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../common/Button/Button';
import styles from "./UserInbox.module.scss";
import { DeleteIcon } from '../../../../assets/icons/icons';
import { useSelector } from 'react-redux';
import Shimmer from '../../../common/Shimmer/Shimmer';
import { useParams } from 'react-router-dom';
import { AXIOS_GET, AXIOS_POST } from '../../../../utils/axios';
import { API_URL } from '../../../../utils/constants';
import Input from '../../../common/Formik/Input/Input';

const UserInbox = () => {
    const ref = useRef();
    const { id } = useParams();
    const { loading } = useSelector(state => state.loading);
    const { user } = useSelector(state => state.user);
    const [chat, setChat] = useState(null);
    const handleSendMsg = async (values, formikProps) => {
        const response = await AXIOS_POST(API_URL.CHAT.INITIATE, {
            "receiver": id,
            "message": values.msg
        })
        console.log('response', response);
        getChat();
        formikProps.resetForm()
    }
    const getChat = async () => {
        const response = await AXIOS_GET(`${API_URL.CHAT.RECENT_CHAT}/${id}`);
        setChat(response.data.data);
    }
    useEffect(() => {
        getChat();
        ref.current && ref.current.scrollTo(0, 100000);
    }, [id])

    return (
        <>
            <div className={styles.chat}>
                {
                    loading ?
                        <>
                            <ul>
                                <li className={styles.recieved}>
                                    <Shimmer width="80%" />
                                </li>
                                <li className={styles.recieved}>
                                    <Shimmer width="40%" />
                                </li>
                                <li className={styles.sent}>
                                    <Shimmer width="50%" height="80px" className={"ms-auto d-block"} />
                                </li>
                                <li className={styles.sent}>
                                    <Shimmer width="70%" className={"ms-auto d-block"} />
                                </li>
                                <li className={styles.recieved}>
                                    <Shimmer width="80%" />
                                </li>
                                <li className={styles.recieved}>
                                    <Shimmer width="40%" />
                                </li>
                                <li className={styles.sent}>
                                    <Shimmer width="50%" height="80px" className={"ms-auto d-block"} />
                                </li>
                                <li className={styles.sent}>
                                    <Shimmer width="70%" className={"ms-auto d-block"} />
                                </li>
                                <li className={styles.recieved}>
                                    <Shimmer width="80%" />
                                </li>
                                <li className={styles.recieved}>
                                    <Shimmer width="40%" />
                                </li>
                                <li className={styles.sent}>
                                    <Shimmer width="50%" height="80px" className={"ms-auto d-block"} />
                                </li>
                                <li className={styles.sent}>
                                    <Shimmer width="70%" className={"ms-auto d-block"} />
                                </li>
                            </ul>
                        </>
                        :
                        <>
                            {
                                <ul ref={ref}>
                                    {
                                        chat &&
                                            chat.length > 0 ?
                                            chat.map((item, index) => {
                                                return (
                                                    <li key={index} className={item.sender !== user._id ? styles.recieved : styles.sent
                                                    }>
                                                        <p>
                                                            {item.message}
                                                        </p>
                                                    </li>
                                                )
                                            })
                                            :
                                            <>
                                                <h3 className='text-center'>No record found</h3>
                                            </>
                                    }
                                </ul>
                            }
                        </>
                }
                <Formik
                    initialValues={{
                        msg: "",
                    }}
                    onSubmit={handleSendMsg}
                >
                    {
                        formik => (
                            <Form>
                                {/* <Field
                                    as="textarea"
                                    name="msg"
                                /> */}
                                <Input
                                    name="msg"
                                />
                                <Button disabled={!formik.dirty} type="submit">Send</Button>
                            </Form>
                        )
                    }
                </Formik>
            </div >
        </>
    )
}

export default UserInbox










{/* <li className={styles.recieved}>
                                        <p>
                                            this is message which i have received
                                        </p>
                                    </li>
                                    <li className={styles.sent}>
                                        <p>
                                            this is
                                        </p>
                                        <div>
                                            <button className={styles.delete_btn}><DeleteIcon /></button>
                                        </div>
                                    </li> */}