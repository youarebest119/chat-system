import { Form, Formik } from 'formik';
import React from 'react';
import { Card } from 'react-bootstrap';
import Input from '../../../common/Formik/Input/Input';
// import Button from '../../../common/Button/Button'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { AXIOS_POST } from '../../../../utils/axios';
import { API_URL, ROUTES } from '../../../../utils/constants';
import Button from '../../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../redux/features/user.slice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validationSchema = Yup.object({
        // username: Yup.string().required().min(6),
        // password: Yup.string().required().min(6),
    })
    const initialValues = {
        username: "",
        password: "",
    }
    const handleSubmit = async values => {
        let response = await AXIOS_POST(API_URL.USER.LOGIN, values)
        console.log('response.data', response.data);
        dispatch(setUser({ ...response.data.data }));
        localStorage.setItem("token", response.data.token);
        navigate(ROUTES.INBOX)
    }
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Input
                                name="username"
                                label="Username"
                            />
                            <Input
                                name="password"
                                label="Password"
                                type="password"
                            />
                            <Button
                                fluid
                                type="submit"
                            >Submit</Button>
                            <Link to={ROUTES.REGISTER}>Register</Link>
                        </Form>
                    </Formik>
                </Card.Body>
            </Card>
        </>
    )
}

export default Login
