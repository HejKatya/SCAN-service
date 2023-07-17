import React from 'react';
import { useState } from 'react';
import AppHeader from '../Header/AppHeader';
import AppFooter from '../Footer/AppFooter';
import { MyContext } from "../../App";
import styles from './Search.module.css';

const AppSearch = () => {
  const [focus, setFocus] = useState(false)
  const [fullness, setFullness] = useState(false)
  const [buisness, setBuisness] = useState(false)
  const [main, setMain] = useState(false)
  const [risk, setRisk] = useState(false)
  const [technews, setTechnews] = useState(false)
  const [calendars, setCalendars] = useState(false)
  const [news, setNews] = useState(false)

  const checkInfo = [
    {
      info: 'Признак максимальной полноты',
      state: fullness,
      setstate: setFullness
    },
    {
      info: 'Упоминания в бизнес-контексте',
      state: buisness,
      setstate: setBuisness
    },
    {
      info: 'Главная роль в публикации',
      state: main,
      setstate: setMain
    },
    {
      info: 'Публикации только с риск-факторами',
      state: risk,
      setstate: setRisk
    },
    {
      info: 'Включать технические новости рынков',
      state: technews,
      setstate: setTechnews
    },
    {
      info: 'Включать анонсы и календари',
      state: calendars,
      setstate: setCalendars
    },
    {
      info: 'Включать сводки новостей',
      state: news,
      setstate: setNews
    }
  ]

  return (
    <>
    <AppHeader />
    <main className={styles.main}>
      <div className={styles.document} style={{
        backgroundImage: 'url(/imgs/search/document.svg)'
      }}></div>
      <div className={styles.folders} style={{
        backgroundImage: 'url(/imgs/search/folders.svg)'
      }}></div>
      <div className={styles.characters} style={{
        backgroundImage: 'url(/imgs/search/characters.svg)'
      }}></div>
      <h1 className={styles.heading}>Найдите необходимые данные в пару кликов.</h1>
      <p className={styles.sub_text}>Задайте параметры поиска. <br/> Чем больше заполните, тем точнее поиск</p>
      <form action="" className={styles.form}>
        <div className={styles.form_left}>
          <label className={styles.label} htmlFor="ITN">ИНН компании<sup className={styles.star}>*</sup></label>
          <input className={styles.input} type="number" name='ITN' placeholder='10 цифр'/>
          <label className={styles.label} htmlFor="tone">Тональность</label>
          <select className={styles.select} defaultValue='any' name="tone" id="" style={{
            backgroundImage: "url(/imgs/search/input-arrow.svg)"
          }}>
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
            <option value="any">Любая</option>
          </select>
          <label className={styles.label} htmlFor="amount">Количество документов в выдаче<sup className={styles.star}>*</sup></label>
          <input className={styles.input} type='number' name='amount' min="1" max="1000" placeholder='От 1 до 1000'/>
          <label htmlFor="date" className={`${styles.label} ${styles.label_date}`}>Диапазон поиска<sup className={styles.star}>*</sup></label>
          <input 
          name='date'
          onFocus={(e) => {
            (e.target.type = "date")
            setFocus(true)
          }}
          onBlur={(e) => {
            (e.target.type = "text")
            setFocus(false)
          }}
          type="text" className={`${styles.input} ${styles.input_date}`}
          placeholder='Дата начала'
          style={!focus ? {
            backgroundImage: "url(/imgs/search/input-arrow.svg)"
          } : {}}/>
          <input 
          onFocus={(e) => {
            (e.target.type = "date")
            setFocus(true)
          }}
          onBlur={(e) => {
            (e.target.type = "text")
            setFocus(false)
          }}
          type="text" className={`${styles.input} ${styles.input_date}`}
           placeholder='Дата конца'
           style={!focus ? {
            backgroundImage: "url(/imgs/search/input-arrow.svg)"
          } : {}}/>
        </div>
        <div className={styles.form_right}>
          <div className={styles.check_container}>
            {checkInfo.map(item => {
              return (
              <label key={item.info} className={styles.check_label}>
                <input type="checkbox" className={item.state ? styles.check_input_active : styles.check_input} onChange={() => {
                  item.setstate(!item.state)
                }}/>
                <div  className={item.state ? styles.mark_checked : styles.mark_not_checked} style={{
                  backgroundImage: "url(/imgs/search/check.svg)"
                }}></div>
                <span className={item.state ? styles.check_text_active : styles.check_text}>{item.info}</span>
              </label>
              )
            })}
          </div>
          <button className={styles.btn} disabled>Поиск</button>
          <div className={styles.bottom_text}><sup className={styles.star}>*</sup> Обязательные к заполнению поля</div>
        </div>
      </form>
    </main>
    <AppFooter />
    </>
  )
}

export default AppSearch