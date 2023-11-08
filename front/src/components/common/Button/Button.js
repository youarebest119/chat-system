import React from 'react'

const Button = ({ className, children, fluid, ...rest }) => {
    return (
        <button
            {...rest}
            className={`${className || ""} btn btn-primary ${fluid ? "w-100" : ""}`}
        >
            {children}
        </button>
    )
}

export default Button
