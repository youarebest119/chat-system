import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'

const Input = ({ label, name, type, ...rest }) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {label && <Form.Label>{label}</Form.Label>}
                <Field
                    {...rest}
                    className="form-control"
                    name={name}
                    type={type}
                />
                <ErrorMessage
                    name={name}
                />
            </Form.Group>
        </>
    )
}

export default Input
