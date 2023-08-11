import React from 'react'
import styles from './Footer.module.css'

const AppFooter = () => {

  return (
    <footer className={styles.footer}>
        <img className={styles.logo} src="/imgs/footer/white-logo.svg" alt="лого компании скан" />
        <div className={styles.footer_info}>
            <p className={styles.footer_info_item}>г. Москва, Цветной б-р, 40</p>
            <a href="tel:+7(495)771-21-11" className={styles.footer_info_item}>+7 495 771 21 11</a>
            <a href="mailto:info@skan.ru" className={styles.footer_info_item}>info@skan.ru</a>
            <p className={styles.footer_copy}>Copyright. 2022</p>
        </div>
    </footer>
  )
}

export default AppFooter