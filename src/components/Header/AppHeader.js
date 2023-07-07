import React, { useContext } from "react";
import { Context } from "../../App";
import styles from './Header.module.css'

const AppHeader = () => {
    const [signedIn, setSignedIn] = useContext(Context)


    return (
        <header className={styles.header}>
            <img src="/imgs/main/logo.svg" alt="scan project logo"/>
        </header>
    )
}

export default AppHeader;