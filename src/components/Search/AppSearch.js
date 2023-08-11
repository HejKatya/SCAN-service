import React, { useEffect } from 'react';
import Popup from '../Popup/Popup';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setHistograms } from '../../slices/histogramsSlice';
import { setSearchParams } from '../../slices/searchParamsSlice';
import { useNavigate } from 'react-router-dom';
import { setDocumentIds } from '../../slices/documentIdsSlice';
import { setDocuments } from '../../slices/documentsSlice';
import { useState } from 'react';
import AppHeader from '../Header/AppHeader';
import AppFooter from '../Footer/AppFooter';
import { MyContext } from "../../App";
import styles from './Search.module.css';

const AppSearch = () => {
  const [popupActive, setPopupActive] = useState(false)
  const [popupChild, setPopupChild] = useState()
  const navigate = useNavigate()
  const [emptyResponse, setEmptyResponse] = useState(false)
  const [focus, setFocus] = useState(false)
  const [fullness, setFullness] = useState(false)
  const [buisness, setBuisness] = useState(false)
  const [main, setMain] = useState(false)
  const [risk, setRisk] = useState(false)
  const [technews, setTechnews] = useState(false)
  const [calendars, setCalendars] = useState(false)
  const [news, setNews] = useState(false)
  const [itn, setItn] = useState()
  const [verifyItn, setVerifyItn] = useState()
  const [tone, setTone] = useState()
  const [amount, setAmount] = useState()
  const [verifyAmount, setVerifyAmount] = useState()
  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()
  const [verifyDate, setVerifyDate] = useState(false)
  const [verifyBtn, setVerifyBtn] = useState(false)

  const dispatch = useDispatch();
  const histograms = useSelector((state) => state.histograms.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const documentIds = useSelector((state) => state.documentIds.value);
  const documents = useSelector((state) => state.documents.value);

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

  useEffect(() => {
    if(localStorage.getItem('searchParams')) {
      localStorage.removeItem('searchParams')
    }
    if (localStorage.getItem('histograms')) {
      localStorage.removeItem('histograms')
    }
    dispatch(setHistograms(''))
    dispatch(setSearchParams(''))
    if (documents) {
      dispatch(setDocuments(''))
    }
    if (documentIds) {
      dispatch(setDocumentIds(''))
    }
    if (localStorage.getItem('accessToken')) return
    else {
      navigate('/') 
    }
  }, [])

  //verifications

  useEffect(() => {
    const regexNumber = /^[\d+]{10}$/
    const matchNumber = regexNumber.exec(itn)

    if (matchNumber) {
      setVerifyItn(true)
    } else {
      setVerifyItn(false)
    }
  }, [itn])

  useEffect(() => {
    let startDate
    let endDate
    const currentDate = new Date()
    if (dateStart) {
      startDate = new Date(dateStart)
    }
    if (dateEnd) {
      endDate = new Date(dateEnd)
    }

    if (startDate && endDate) {
      if (startDate.getTime() <= currentDate.getTime() && endDate.getTime() <= currentDate.getTime()) {
        if (startDate.getTime() <= endDate.getTime()) {
          setVerifyDate(true)
        } else {
          setVerifyDate(false)
        }
      } else {
        setVerifyDate(false)
      }
    }
  }, [dateStart, dateEnd])

  useEffect(() => {
    setAmount(Number(amount))
    if (amount > 0 && amount <= 1000) {
      setVerifyAmount(true)
    } else {
      setVerifyAmount(false)
    }
  }, [amount])

  useEffect(() => {
    if (verifyItn && verifyAmount && verifyDate) {
      setVerifyBtn(true)
    }
  }, [verifyItn, verifyAmount, verifyDate])

  // request 
  
  const requestBody = {
    "issueDateInterval": {
      "startDate": dateStart,
      "endDate": dateEnd
    },
    "searchContext": {
      "targetSearchEntitiesContext": {
        "targetSearchEntities": [
          {
            "type": "company",
            "sparkId": null,
            "entityId": null,
            "inn": itn,
            "maxFullness": fullness,
            "inBusinessNews": buisness
          }
        ],
        "onlyMainRole": main,
        "tonality": tone,
        "onlyWithRiskFactors": risk,
        "riskFactors": {
          "and": [],
          "or": [],
          "not": []
        },
        "themes": {
          "and": [],
          "or": [],
          "not": []
        }
      },
      "themesFilter": {
        "and": [],
        "or": [],
        "not": []
      }
    },
    "searchArea": {
      "includedSources": [],
      "excludedSources": [],
      "includedSourceGroups": [],
      "excludedSourceGroups": []
    },
    "attributeFilters": {
      "excludeTechNews": !technews,
      "excludeAnnouncements": !calendars,
      "excludeDigests": !news
    },
    "similarMode": "duplicates",
    "limit": amount,
    "sortType": "sourceInfluence",
    "sortDirectionType": "desc",
    "intervalType": "month",
    "histogramTypes": [
      "totalDocuments",
      "riskFactors"
    ]
  }

  const myRequest = async (e) => {
    const result = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', requestBody, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken')).accessToken}`,
        'accept': 'application/json'
      }
    })
    .catch(err => {})
    let responseData 
    let total = []
    let risk = []
    let totalAmount = 0
    let riskAmount = 0
    if (result.data) {
      if (result.data.data.length === 0) {
        setEmptyResponse(true)
      } else {
        setEmptyResponse(false)
        result.data.data[0].data.map(item => {
          total.push(item)
          totalAmount += item.value
      })
      result.data.data[1].data.map(item => {
        risk.push(item)
        riskAmount += item.value
      })
      responseData = {
        total: total,
        risk: risk,
        amount: totalAmount + riskAmount
      }}
    } else {
      responseData = false
    }
    
    return responseData 
  }

  const setData = async () => {
    let result = await myRequest()
    if (!result || emptyResponse) {
      setPopupActive(true)
      if (!result) {
        setPopupChild('Введен неверный ИНН')
      } else if (emptyResponse) {
        setPopupChild('По вашему запросу статей не найдено. Попробуйте ещё раз.')
      }
    } else {
      dispatch(setHistograms(result))
      navigate('/results')  
    }  
    dispatch(setSearchParams(requestBody))

  }

  useEffect(() => {
    localStorage.setItem('histograms', JSON.stringify(histograms))
  }, [histograms])

  useEffect(() => {
    localStorage.setItem('searchParams', JSON.stringify(searchParams))
  }, [searchParams])
   

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
      <form action="POST" className={styles.form}>
        <div className={styles.form_left}>
          <label className={styles.label} htmlFor="ITN" >ИНН компании<sup className={styles.asterisk}>*</sup></label>
          <input className={!itn || (itn && verifyItn) ? `${styles.input} ${styles.input_itn}` : `${styles.input} ${styles.input_itn} ${styles.input_itn_invalid}`}  type="text" name='ITN' placeholder='10 цифр' required minLength='10' maxLength = "10" onInput={e => {
                            setItn(e.target.value)
                        }}/>
          <div className={styles.itn_error} style={itn && !verifyItn ? {display: 'block'} : {display: 'none'}}>Введите корректные данные</div>
          <label className={styles.label} htmlFor="tone">Тональность</label>
          <select className={styles.select} defaultValue='any' name="tone" id="" style={{
            backgroundImage: "url(/imgs/search/input-arrow.svg)"
          }} 
          onInput={e => {
            setTone(e.target.value)
        }}>
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
            <option value="any">Любая</option>
          </select>
          <label className={styles.label} htmlFor="amount">Количество документов в выдаче<sup className={styles.asterisk}>*</sup></label>
          <input className={!amount || (amount && verifyAmount) ? `${styles.input} ${styles.input_amount}` : `${styles.input} ${styles.input_amount} ${styles.input_amount_invalid}`} 
          type='number' name='amount' min="1" max="1000" placeholder='От 1 до 1000' required 
          onInput={e => {
                            setAmount(e.target.value)
                        }}/>
          <div className={styles.amount_error} style={!amount || (amount && verifyAmount) ? {display: 'none'} : {display: 'block'}}>Обязательное поле</div>
          <label htmlFor="dateStart" className={`${styles.label} ${styles.label_date}`}>Диапазон поиска<sup className={styles.asterisk}>*</sup></label>
          <input 
          onInput={e => {
            setDateStart(new Date(e.target.value))
        }}
          name='dateStart'
          onFocus={(e) => {
            (e.target.type = "date")
            setFocus(true)
          }}
          onBlur={(e) => {
            (e.target.type = "text")
            setFocus(false)
          }}
          type="text" 
          className={dateStart && !verifyDate ? `${styles.input} ${styles.input_date} ${styles.input_date_invalid}` : `${styles.input} ${styles.input_date}`}
          placeholder='Дата начала'
          style={!focus ? {
            backgroundImage: "url(/imgs/search/input-arrow.svg)"
          } : {}}/>
          <input 
          onInput={e => {
            setDateEnd(new Date(e.target.value))
        }}
          name='dateEnd'
          onFocus={(e) => {
            (e.target.type = "date")
            setFocus(true)
          }}
          onBlur={(e) => {
            (e.target.type = "text")
            setFocus(false)
          }}
          type="text" 
          className={dateEnd && !verifyDate ? `${styles.input} ${styles.input_date} ${styles.input_date_invalid}` : `${styles.input} ${styles.input_date}`}
           placeholder='Дата конца'
           style={!focus ? {
            backgroundImage: "url(/imgs/search/input-arrow.svg)"
          } : {}} required/>
          <div className={styles.date_error} style={(dateStart || dateEnd) && !verifyDate ? {display: 'block'} : {display: 'none'}}>Введите корректные данные</div>
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
          <button type='button' className={styles.btn} disabled={verifyBtn ? false : true} onClick={setData}>Поиск</button>
          <div className={styles.bottom_text}><sup className={styles.asterisk}>*</sup> Обязательные к заполнению поля</div>
        </div>
      </form>
      <Popup active={popupActive} setActive={setPopupActive} children={popupChild}/>
    </main>
    <AppFooter />
    </>
  )
}

export default AppSearch