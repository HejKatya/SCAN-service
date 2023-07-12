import React, { useContext } from "react";
import { Context } from "../../App";
import styles from './Header.module.css'

const AppHeader = () => {
    const [signedIn, setSignedIn] = useContext(Context)

    const signIn = () => {

    }

    const signOut = () => {
        setSignedIn(false)
    }

    return (
        <header className={styles.header}>
            <img className={styles.logo} src="/imgs/header/logo.svg" alt="scan project logo"/>
            <nav className={styles.nav}>
                <ul className={styles.nav_list}>
                    <li className={styles.nav_item}>
                        <a className={styles.nav_link} href=" ">Главная</a>
                    </li>
                    <li className={styles.nav_item}>
                        <a className={styles.nav_link} href=" ">Тарифы</a>
                    </li>
                    <li className={styles.nav_item}>
                        <a className={styles.nav_link} href=" ">FAQ</a>
                    </li>
                </ul>
            </nav>
            {!signedIn ? 
            <div className={styles.not_signed}>
                <a className={styles.link_disabled} href=" ">Зарегистрироваться</a>
                <button onClick={signIn} className={styles.btn}>Войти</button>
            </div>   
            : 
            <div className={styles.signed}>
                <div className={styles.info}>
                    <div className={styles.info_left}>
                        <h6 className={styles.info_text}>Использовано компаний</h6>
                        <h6 className={styles.info_text}>Лимит по компаниям</h6>        
                    </div>    
                    <div className={styles.info_right}>
                        <h6 className={styles.info_number}>34</h6>
                        <h6 className={styles.info_number}>100</h6>    
                    </div>
                </div>
                <div className={styles.user}>
                    <div className={styles.user_left}>
                       <h6 className={styles.user_name}>Катя С.</h6>  
                       <button onClick={signOut} className={styles.user_btn}>Выйти</button>
                    </div>
                    <img className={styles.userpic} src="/imgs/header/mock-userpic.svg" alt="the user"/>
                </div>
            </div>    
            }
        </header>
    )
}

export default AppHeader;