import React from 'react';
import styles from "./NoChats.module.scss";

const NoChats = () => {
    return (
        <div className={styles.no_chats}>
            <h2>
                Inbox is empty
            </h2>
        </div>
    )
}

export default NoChats
