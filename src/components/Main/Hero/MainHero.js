import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../App";
import styles from '../Main.module.css'
import { useNavigate } from "react-router-dom";

const MainHero = () => {
    const [signedIn, setSignedIn] = useContext(MyContext);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth)
        } 
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return (
        <section className={styles.hero_section}>
                <h1 className={styles.heading}>сервис по поиску <br/> публикаций <br/> о компании <br/> по его ИНН</h1>
                <p className={styles.paragraph}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                <button onClick={() => navigate('/search')} style={signedIn === false ? {
                            display: 'none'
                        } : {
                            display: 'block'
                        }} 
                        className={`${styles.hero_btn} ${styles.btn}`}>Запросить данные</button>
                <div className={styles.hero_background} style={{
                    backgroundImage: 'url(/imgs/main/hero-banner.svg)'
                }}></div>
        </section>
    )
}

export default MainHero;