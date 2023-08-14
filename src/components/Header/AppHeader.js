import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCompanyLimit } from "../../slices/companyLimitSlice";
import { setAccessToken } from '../../slices/accessTokenSlice';
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import styles from './Header.module.css';
import axios from "axios";

const AppHeader = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [active, setActive] = useState(false)
    const [signedIn, setSignedIn] = useContext(MyContext);
    const companyLimit = useSelector((state) => state.companyLimit.value);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const signOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('histograms')
        localStorage.removeItem('searchParams')
        setSignedIn(false)
        dispatch(setAccessToken(''))
    }

    const infoRequest = async () => {
        if (localStorage.getItem('accessToken')) {
            const result = await axios.get('https://gateway.scan-interfax.ru/api/v1/account/info', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken')).accessToken}`,
                'accept': 'application/json'
            }})
            let responseData 
            if (result) {
                responseData = {
                    companyLimit: result.data.eventFiltersInfo.companyLimit,
                    usedCompanyCount: result.data.eventFiltersInfo.usedCompanyCount
                  }
            } else {
                responseData = false
            }
            return responseData 
        }
    }

    const setData = async () => {
        let result = await infoRequest()
        if (result) {
            dispatch(setCompanyLimit(result))
        }  
      }

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) return 
        else {
            setData()
        }
    }, [])

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth)
        } 
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const displayLimit = () => {
        if (companyLimit && windowWidth > 1000) {
             return (
            <div className={styles.info}>
                    <div className={styles.info_left}>
                        <h6 className={styles.info_text}>Использовано компаний</h6>
                        <h6 className={styles.info_text}>Лимит по компаниям</h6>        
                    </div>    
                    <div className={styles.info_right}>
                        <h6 className={styles.info_number}>{companyLimit.usedCompanyCount}</h6>
                        <h6 className={styles.info_number}>{companyLimit.companyLimit}</h6>    
                    </div>
            </div>
        )
        } else if (companyLimit) {
            return (
               <div className={styles.info} style={active ? {display: 'none'} : {}}>
                    <div className={styles.info_top}>
                        <h6 className={styles.info_text}>Использовано компаний</h6>
                        <h6 className={styles.info_number_black}>{companyLimit.usedCompanyCount}</h6>
                    </div>    
                    <div className={styles.info_bottom}>
                        <h6 className={styles.info_text}>Лимит по компаниям</h6>  
                        <h6 className={styles.info_number}>{companyLimit.companyLimit}</h6>    
                    </div>
            </div> 
            )
        } else {
            return (
                <div className={`${styles.info_loading} ${styles.info}`}>
                    <div className={styles.info_background} style={windowWidth > 1000 ? {
                    backgroundImage: 'url(/imgs/header/loader.svg)'
                } : {
                    backgroundImage: 'url(/imgs/header/loader.svg)',
                    left: '40%',
                    top: '34%'
                }}></div>
                </div>
            )
    }}

    const burgerMenu = () => {
        if (active) {
            setActive(false)
        } else {
           setActive(true) 
        }   
    }

    useEffect(() => {
        if (windowWidth > 1000) {
            setActive(false)
        }
    }, [windowWidth])

    const displayMenu = () => {
        return (
            <div className={styles.hidden_menu}>
                <nav className={styles.hidden_nav}>
                    <ul className={styles.hidden_list}>
                    <li className={styles.hidden_item}>
                        <Link className={styles.hidden_link} to={'/'}>Главная</Link>
                    </li>
                    <li className={styles.hidden_item}>
                        <a className={styles.hidden_link} href=" ">Тарифы</a>
                    </li>
                    <li className={styles.hidden_item}>
                        <a className={styles.hidden_link} href=" ">FAQ</a>
                    </li>
                    </ul>
                </nav>
                <a style={signedIn ? {display: 'none'} : {}} className={styles.hidden_link_disabled} href=" ">Зарегистрироваться</a>
                <div onClick={signOut} style={!signedIn ? {display: 'none'} : {}} className={styles.hidden_link_disabled}>Выйти</div>
                <button style={signedIn ? {display: 'none'} : {}} className={styles.hidden_btn} onClick={() => navigate('/authorization')}>Войти</button>
            </div>
        )
    }

    return (
        <header className={styles.header} style={active ? {backgroundColor: '#029491'} : {}}>
            <div className={styles.header_container}>
            <Link to={'/'}>
            <img className={styles.logo} src={active ? "/imgs/header/logo-white.svg" : "/imgs/header/logo.svg"} alt="scan project logo" style={active ? {marginTop: '10px'} : {}}/>
            </Link>
            <nav className={styles.nav}>
                <ul className={styles.nav_list}>
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link} to={'/'}>Главная</Link>
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
            <div className={styles.not_signed} style={windowWidth > 1000 ? {display: 'block'} : {display: 'none'}}>
                <a className={styles.link_disabled} href=" ">Зарегистрироваться</a>
                <button className={styles.btn} onClick={() => navigate('/authorization')}>Войти</button>
            </div>   
            : 
            <div className={styles.signed}>
                {displayLimit()}
                <div className={styles.user}>
                    <div className={styles.user_left}>
                       <h6 className={styles.user_name}>Алексей А.</h6>  
                       <button onClick={signOut} className={styles.user_btn}>Выйти</button>
                    </div>
                    <img className={styles.userpic} src="/imgs/header/userpic.png" alt="the user"/>
                </div>
            </div>    
            }
            <div onClick={burgerMenu} className={styles.burger_icon} style={windowWidth > 1000 ? {display: 'none'} : active ? {backgroundImage: 'url(/imgs/header/cross.svg)'} : {backgroundImage: 'url(/imgs/header/burger-menu.svg)'}}></div>
            </div>
            {active ? displayMenu() : null}
        </header>
    )
}

export default AppHeader;