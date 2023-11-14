import React from 'react'
import styles from "./Button.module.scss";
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux'

const Button = ({ className, children, fluid, ...rest }) => {
    const { loading } = useSelector(state => state.loading);
    return (
        <button
            {...rest}
            className={`${className || ""} ${styles.button} btn btn-primary ${fluid ? "w-100" : ""}`}
        >
            {
                loading ?
                    <Spinner />
                    :
                    children
            }
        </button>
    )
}

export default Button
