import React, { useContext } from "react";
import { Context } from "../../../App";
import styles from '../Main.module.css'

const MainHero = () => {
    const [signedIn, setSignedIn] = useContext(Context)

    return (
        <section className={styles.hero_section} style={{
            backgroundImage: 'url(/imgs/main/hero-banner.svg)'
        }}>
            <h1 className={styles.heading}>сервис по поиску <br/> публикаций <br/> о компании <br/> по его ИНН</h1>
            <p className={styles.paragraph}>Комплексный анализ публикаций, получение данных <br/> в формате PDF на электронную почту.</p>
            <button style={signedIn === false ? {
                            display: 'none'
                        } : {
                            display: 'block'
                        }} 
                        className={`${styles.hero_btn} ${styles.btn}`}>
                            Запросить данные
            </button>
        </section>
    )
}

export default MainHero;