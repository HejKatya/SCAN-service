import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MyContext } from '../../App';
import { setAccessToken } from '../../slices/accessTokenSlice';
import AppHeader from '../Header/AppHeader';
import AppFooter from '../Footer/AppFooter';
import styles from './Authorization.module.css'
import { useNavigate } from 'react-router-dom';

const AppAuthorization = () => {
  const [signedIn, setSignedIn] = useContext(MyContext);
  const accessToken = useSelector((state) => state.accessToken.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [verifyLog, setVerifyLog] = useState();
  const [verifyPass, setVerifyPass] = useState();
  const [error, setError] = useState();

  const verification = () => {
    const regexNumber = /^[\d\+][\d\(\)\ -]{4,14}\d$/
    const matchNumber = regexNumber.exec(login)
    const regexLogin = /sf_student[0-9]/
    const matchLogin = regexLogin.exec(login)

    if (matchNumber || matchLogin) {
      setVerifyLog(true)
    } else {
      setVerifyLog(false)
    }
    if (password) {
      setVerifyPass(true)
    } else {
      setVerifyPass(false)
    }
  }

  useEffect(() => {
    verification()
  }, [login, password])

  useEffect(() => {
    if (error) {
      setError(false)
    }
  }, [password, login])

  const myRequest = async (e) => {
    const result = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', {
      'login': login,
      'password': password
    }, {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch(err => {})
    let responseData
    if (result) {
      responseData = {
      accessToken: result.data.accessToken,
      expire: result.data.expire
    }
    } else {
      responseData = false
    }
    return responseData 
  }
 
  const setData = async () => {
    let result = await myRequest()
    if (!result) {
      setError(true)
    } else {
       dispatch(setAccessToken(result))
       navigate('/')     
    }   
  }
   

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken))
      setSignedIn(true)
    }
  }, [accessToken])

  return (
    <div>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.background_characters} style={{
          backgroundImage: "url(/imgs/authorization/characters.svg)"
        }}></div>
        <div className={styles.lock} style={{backgroundImage: "url(/imgs/authorization/lock.svg)"}}></div>
        <h1 className={styles.heading}>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <form className={styles.form} action="POST">
          <a className={styles.link_active} href=" ">Войти</a>
          <a className={styles.link_inactive} href=" ">Зарегистрироваться</a>
          <label className={styles.label} htmlFor="login">Логин или номер телефона:</label>
          <input className={styles.input} type="text" name='login' id='login' onInput={e => {
                            setLogin(e.target.value)
                        }}
                        style={login && !verifyLog || error ? { 
                          border: '1px solid #FF5959',
                          boxShadow: '0px 0px 20px 0px rgba(255, 89, 89, 0.20)',
                          color: '#FF5959'
                        } : {}} />
          <div className={styles.login_error} style={login && !verifyLog ? {display: 'block'} : {}}>Введите корректные данные</div>            
          <label className={styles.label} htmlFor="password">Пароль:</label>
          <input className={styles.input} type="password" name='password' id='password' onInput={e => {
                            setPassword(e.target.value)
                        }}
                        style={error ? {
                          border: '1px solid #FF5959',
                          boxShadow: '0px 0px 20px 0px rgba(255, 89, 89, 0.20)',
                          color: '#FF5959'
                        } 
                        : {}}/>
          <div className={styles.password_error} style={error ? {display: 'block'} : {}}>Неправильный пароль или логин</div>            
          <button type='button' onClick={setData} className={styles.btn} disabled={!verifyLog || !verifyPass || error}>Войти</button>
          <a className={styles.link_password} href=" ">Восстановить пароль</a>
          <p className={styles.text}>Войти через:</p>
          <div className={styles.btns}>
            <a href=" " className={styles.site_link}>
              <img className={styles.site_img} src="/imgs/authorization/google.svg" alt="google logo" />
            </a>
            <a href=" " className={styles.site_link}>
              <img className={styles.site_img} src="/imgs/authorization/facebook.svg" alt="facebook logo" />
            </a>
            <a href=" " className={styles.site_link}>
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