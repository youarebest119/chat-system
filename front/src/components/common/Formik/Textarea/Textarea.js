import { Field } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'

const Textarea = ({ label, name, ...rest }) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                {label && <Form.Label>{label}</Form.Label>}
                <Field
                    {...rest}
                    as="textarea"
                    name={name}
                />
            </Form.Group>
        </>
    )
}

export default Textarea
