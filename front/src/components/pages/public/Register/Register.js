import { Form, Formik } from 'formik'
import React from 'react'
import { Card } from 'react-bootstrap'
import Input from '../../../common/Formik/Input/Input'
import Button from '../../../common/Button/Button'
import { Link } from 'react-router-dom'
import * as Yup from "yup";
import { ROUTES } from '../../../../utils/constants'

const Register = () => {
    const validationSchema = Yup.object({
        username: Yup.string().required().min(6),
        password: Yup.string().required().min(6),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
    })
    const initialValues = {
        username: "",
        password: "",
        confirmPassword: "",
    }
    const handleSubmit = values => {

    }
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Register</Card.Title>
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
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                            />
                            <Button
                                fluid
                                type="submit"
                            >Submit</Button>
                            <Link to={ROUTES.LOGIN}>Login</Link>
                        </Form>
                    </Formik>
                </Card.Body>
            </Card>
        </>
    )
}

export default Register
