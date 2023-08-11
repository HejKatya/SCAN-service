import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHistograms } from '../../slices/histogramsSlice';
import { setSearchParams } from '../../slices/searchParamsSlice';
import { setDocumentIds } from '../../slices/documentIdsSlice';
import { setDocuments } from '../../slices/documentsSlice';
import AppHeader from '../Header/AppHeader';
import AppFooter from '../Footer/AppFooter';
import AppArticleCard from './AppArticleCard';
import styles from './Results.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AppResults = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [showBtn, setShowBtn] = useState(true)
  const [currentAmount, setCurrentAmount] = useState(10);
  const [wholeAmount, setWholeAmount] = useState();
  const [executed, setExecuted] = useState(false);

  const sliderRef = useRef()
  const itemRef = useRef()
  const mobileRef = useRef()
  const itemWidth = itemRef.clientWidth
  const dispatch = useDispatch();

  const histograms = useSelector((state) => state.histograms.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const documentIds = useSelector((state) => state.documentIds.value);
  const documents = useSelector((state) => state.documents.value);

  useEffect(() => {
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth)
    } 
    window.addEventListener('resize', handleWindowResize)

    return () => {
        window.removeEventListener('resize', handleWindowResize)
    }
}, [])

  useEffect(() => {
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

  useEffect(() => {
    if (localStorage.getItem('histograms')) {
     dispatch(setHistograms(JSON.parse(localStorage.getItem('histograms'))))
    }
    if(localStorage.getItem('searchParams')) {
      dispatch(setSearchParams(JSON.parse(localStorage.getItem('searchParams'))))
    }
  }, [])
  
  const requestObjectSearch = async (requestBody) => {
    const result = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch', requestBody, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken')).accessToken}`,
        'accept': 'application/json'
      }
    })
    .catch(err => {console.log('err')})
    let responseData
    if (result) {
      responseData = result.data.items
    } else {
      responseData = false
    }
    return responseData
  }

  const setData = async (requestBody) => {
    let result = await requestObjectSearch(requestBody)
    let data
    if (result) {
      const stringifiedItems = result.map(item => {
        const result = String(item.encodedId)
        return result
      }) 
      data = {ids: stringifiedItems}
      dispatch(setDocumentIds(data))
    }
  }

  useEffect(() => {
    if (!wholeAmount) {
      if (searchParams.limit <= histograms.amount) {
        setWholeAmount(searchParams.limit)
      } else {
        setWholeAmount(histograms.amount)
      }
    }
  }, [searchParams])

  useEffect(() => {
    let mockParams
    if (wholeAmount) {
    mockParams = Object.assign({}, searchParams)
    mockParams.limit = currentAmount
    if (mockParams.limit === currentAmount) {
      setData(mockParams)
    }
    }
  }, [wholeAmount, currentAmount])

  const showMore = () => {
    setLoadingBtn(true)
    if (currentAmount < wholeAmount && wholeAmount - currentAmount >= 10) {
      setCurrentAmount(currentAmount + 10)
      setExecuted(false)
    } else if (currentAmount < wholeAmount && wholeAmount - currentAmount < 10) {
      setCurrentAmount(currentAmount + (wholeAmount - currentAmount))
      setExecuted(false)
    } 
  }

  useEffect(() => {
       if (currentAmount >= wholeAmount && !loadingBtn) {
        setShowBtn(false)
    }
  }, [currentAmount, loadingBtn, documents])

  const documentsRequest = async (e) => {
    const result = await axios.post('https://gateway.scan-interfax.ru/api/v1/documents', documentIds, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken')).accessToken}`,
        'accept': 'application/json'
      }
    })
    .catch(err => {console.log('err')})
    let responseData 
    responseData = result.data.map(item => {
      return item.ok
    })
    return responseData
  }

  const getDocuments = async () => {
    let result = await documentsRequest()
    if (result && !executed) {
      dispatch(setDocuments(result))
      setExecuted(true)
    }
    if (loadingBtn) {
      setLoadingBtn(false)
    }
  }

  useEffect(() => {
    if (documentIds) {
      getDocuments()
    } 
  }, [documentIds])
  
  const displayArticles = () => {
    return(
      <div className={styles.section_articles}>
        <div className={styles.articles}>
        {documents.map(item => {
          if (item) {
            return (
              <AppArticleCard item={item} key={item.id}/>
            )
          }
          })}
      </div>
      <button onClick={showMore} style={showBtn ? {display: 'inline-block'} : {display: 'none'}} className={!loadingBtn ? `${styles.articles_btn}` : `${styles.articles_btn} ${styles.articles_btn_loading}`}>{!loadingBtn ? 'Показать больше' : 'Идет загрузка...'}</button>
      </div>
      
    )
  }

  const slideRight = () => {
    if (windowWidth > 760)
    {
       sliderRef.current.scrollLeft += itemRef.current.clientWidth
    } else {
      sliderRef.current.scrollTop += 48
    }
  }

  const slideLeft = () => {  
    if (windowWidth > 760) {
      sliderRef.current.scrollLeft -= itemRef.current.clientWidth 
    } else {
      sliderRef.current.scrollTop -= 48
    }
  }

  const displayHistograms = () => {
    if (histograms && windowWidth > 760) {
      return (
        <table className={styles.table}>
          <tbody>
            <tr className={styles.table_row}>
            {histograms.total.map(item => {
              const date = new Date(item.date)
              const formattedDate = `${date.getDate().toString().length === 2 ? date.getDate() : '0' + date.getDate()}.${(date.getMonth() + 1).toString().length === 2 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}.${date.getFullYear()}`
              return (
                <td key={formattedDate} ref={itemRef} className={styles.table_date}>{formattedDate}</td>
              )
            })}
          </tr>
          <tr className={styles.table_row}>
            {histograms.total.map(item => {
              return (
                <td key={item.date} className={styles.table_value}>{item.value}</td>
              )
            })}
          </tr>
          <tr className={styles.table_row}>
            {histograms.risk.map(item => {
              return (
                <td key={item.date} className={styles.table_value}>{item.value}</td>
              )
            })}
          </tr>
          </tbody>
        </table>
    )
    } else if (histograms && windowWidth < 760) {
      return (
        <div className={styles.table_mobile} >
          <ul className={styles.mobile_column}>
            {histograms.total.map(item => {
              const date = new Date(item.date)
              const formattedDate = `${date.getDate().toString().length === 2 ? date.getDate() : '0' + date.getDate()}.${(date.getMonth() + 1).toString().length === 2 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}.${date.getFullYear()}`
              return (
                <li key={formattedDate} className={styles.mobile_date}>{formattedDate}</li>
              )
            })}
            </ul>
            <ul className={styles.mobile_column}ref={mobileRef}>
              {histograms.total.map(item => {
              return (
                <li key={item.date} className={styles.mobile_value}>{item.value}</li>
              )
            })}
            </ul>
            <ul className={styles.mobile_column}>
              {histograms.risk.map(item => {
              return (
                <li key={item.date} className={styles.mobile_value}>{item.value}</li>
              )
            })}
            </ul>
        </div>
      )
    } else {
      return (
        <div className={styles.summary_loading}>
          <div className={styles.summary_loading_img} 
          style={windowWidth > 760 ? {backgroundImage: 'url(/imgs/header/loader.svg)'}
           : {backgroundImage: 'url(/imgs/header/loader.svg)', left: '40%', top: '20%'}}></div>
          <h4 className={styles.summary_loading_text} style={windowWidth < 760 ? {marginTop: '80px', marginBottom: '15px'} : {}}>Загружаем данные</h4>
        </div>
      )  
    } 
  }


  return (
    <>
      <AppHeader />
      <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.background} style={{
        backgroundImage: 'url(/imgs/results/character.svg)'
      }}></div>
        <h1 className={styles.hero_heading}>
          Ищем. Скоро <br/> будут результаты
        </h1>
        <p className={styles.hero_text}>Поиск может занять некоторое время, <br/> просим сохранять терпение.</p>
      </section>
       <section className={styles.summary}>
        <h2 className={styles.sub_heading}>Общая сводка</h2>
        <p className={styles.sub_text}>Найдено вариантов {histograms.amount}</p>
        <div className={styles.summary_slider} ref={sliderRef}>
          <div onClick={slideLeft} className={styles.arrow_left} style={{
            backgroundImage: 'url(/imgs/main/left-arrow.svg)'
          }} ></div>
          <div onClick={slideRight} className={styles.arrow_right} style={{
            backgroundImage: 'url(/imgs/main/right-arrow.svg)'
          }}></div>
          <ul className={windowWidth > 760? `${styles.summary_header}` : `${styles.summary_header} ${styles.summary_header_mobile}`}>
            <li className={styles.summary_heading}>Период</li>
            <li className={styles.summary_heading}>Всего</li>
            <li className={styles.summary_heading}>Риски</li>
          </ul>
            {displayHistograms()}
        </div>
      </section>
      <section className={styles.documents}>
      <h2 className={styles.sub_heading}>Список документов</h2>
      {documents ? displayArticles() : (<div className={styles.loading_text}>Пожалуйста подождите, выполняется загрузка...</div>)}
      </section>
    </main>
    <AppFooter />
    </>
  )
}

export default AppResults;


