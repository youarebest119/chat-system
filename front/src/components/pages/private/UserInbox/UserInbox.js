import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from '../../../common/Button/Button';
import styles from "./UserInbox.module.scss";

const UserInbox = () => {
    const handleSendMsg = values => {
        console.log(values);
    }
    return (
        <>
            <div className={styles.chat}>
                <ul>
                    <li className={styles.recieved}>
                        <p>
                            this is message which i have received
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            this is message which i have received second time
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            thisis
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is message which i have sent
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is message which i have sent second time
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            this is message which i have received
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            this is message which i have received second time
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            thisis
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is message which i have sent
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is message which i have sent second time
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            this is message which i have received
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            this is message which i have received second time
                        </p>
                    </li>
                    <li className={styles.recieved}>
                        <p>
                            thisis
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is message which i have sent
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is message which i have sent second time
                        </p>
                    </li>
                    <li className={styles.sent}>
                        <p>
                            this is
                        </p>
                    </li>
                </ul>
                <Formik
                    initialValues={{
                        send_message: "",
                    }}
                    onSubmit={handleSendMsg}
                >
                    <Form>
                        <Field
                            as="textarea"
                            name="send_message"
                        />
                        <Button type="submit">Send</Button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default UserInbox
