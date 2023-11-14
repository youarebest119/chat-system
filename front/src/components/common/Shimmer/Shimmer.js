import React from 'react'
import styles from "./Shimmer.module.scss";

const Shimmer = ({ className, height, fluid, width }) => {
    return (
        <span
            className={`${styles.shimmer} ${className || ""}`}
            style={{
                width: fluid ? "100%" : width || "100px",
                height: height || "40px",
            }}
        ></span>
    )
}

export default Shimmer
