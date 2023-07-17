import React from 'react';
import AppHeader from '../Header/AppHeader';
import AppFooter from '../Footer/AppFooter';
import { MyContext } from '../../App';
import styles from './Authorization.module.css'

const AppAuthorization = () => {
  return (
    <div>
      <AppHeader />
      <main className={styles.main} style={{
          backgroundImage: "url(/imgs/authorization/characters.svg)"
        }}>
        <div className={styles.lock} style={{backgroundImage: "url(/imgs/authorization/lock.svg)"}}></div>
        <h1 className={styles.heading}>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <form className={styles.form} action="">
          <a className={styles.link_active} href=" ">Войти</a>
          <a className={styles.link_inactive} href=" ">Зарегистрироваться</a>
          <label className={styles.label} for="login">Логин или номер телефона:</label>
          <input className={styles.input} type="text" name='login'/>
          <label className={styles.label} for="password">Пароль:</label>
          <input className={styles.input} type="password" name='password'/>
          <button className={styles.btn} disabled>Войти</button>
          <a className={styles.link_password} href=" ">Восстановить пароль</a>
          <p className={styles.text}>Войти через:</p>
          <div className={styles.btns}>
            <a href=" ">
              <img className={styles.site_img} src="/imgs/authorization/google.svg" alt="google logo" />
            </a>
            <a href=" ">
              <img className={styles.site_img} src="/imgs/authorization/facebook.svg" alt="facebook logo" />
            </a>
            <a href=" ">
              <img className={styles.site_img} src="/imgs/authorization/yandex.svg" alt="yandex logo" />
            </a>
          </div>
        </form>
      </main>
      <AppFooter />
    </div>
  )
}

export default AppAuthorization