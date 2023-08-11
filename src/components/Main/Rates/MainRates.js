import styles from '../Main.module.css';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../../../App';

const ratesInfo = [
    {
        name: 'Beginner',
        subHead: 'Для небольшого исследования',
        imgUrl: '/imgs/main/beginner.svg',
        currentPrice: '799 ₽',
        prevPrice: '1 200 ₽',
        credit: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        info: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
        backColor: '#FFB64F',
        color: '#000',
        backWidthFull: '92.244px',
        backHeightFull: '83.145px',
        backWidthMob: '59px',
        backHeightMob: '53.181px',
        backTopFull: '11px',
        backRightFull: '15.76px',
        backTopMob: '13px',
        backRightMob: '5px'
    },
    {
        name: 'Pro',
        subHead: 'Для HR и фрилансеров',
        imgUrl: '/imgs/main/pro.svg',
        currentPrice: '1 299 ₽',
        prevPrice: '2 600 ₽',
        credit: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        info: ['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам'],
        backColor: '#7CE3E1',
        color: '#000',
        backWidthFull: '119.96px',
        backHeightFull: '118.76px',
        backWidthMob: '68.299px',
        backHeightMob: '75.734px',
        backTopFull: '0',
        backRightFull: '0',
        backTopMob: '2px',
        backRightMob: '0.38px'
    },
    {
        name: 'Business',
        subHead: 'Для корпоративных клиентов',
        imgUrl: '/imgs/main/business.svg',
        currentPrice: '2 379 ₽',
        prevPrice: '3 700 ₽',
        credit: ' ',
        info: ['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка'],
        backColor: '#000',
        color: '#fff',
        backWidthFull: '96px',
        backHeightFull: '80.09px',
        backWidthMob: '73px',
        backHeightMob: '60.902px',
        backTopFull: '23px',
        backRightFull: '5px',
        backTopMob: '5px',
        backRightMob: '10px'
    }
]

const MainRates = () => {
    const [signedIn, setSignedIn] = useContext(MyContext)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)


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
    <section className={styles.rates_section}>
        <h2 className={styles.rates_heading}>НАШИ ТАРИФЫ</h2>
        <ul className={styles.rates_list}>
            {ratesInfo.map(item => {
                return (
                    <li key={item.name} className={styles.rates_item} >
                        <div className={styles.rates_item_header} style={{
                            backgroundColor: `${item.backColor}`,
                            color: `${item.color}`
                        }}>
                            <div className={styles.rates_background_img} style={windowWidth > 1400 ? {
                                 backgroundImage: `url(${item.imgUrl})`,
                                 width: `${item.backWidthFull}`,
                                 height: `${item.backHeightFull}`,
                                 top: `${item.backTopFull}`,
                                 right: `${item.backRightFull}`
                            } : {
                                backgroundImage: `url(${item.imgUrl})`,
                                 width: `${item.backWidthMob}`,
                                 height: `${item.backHeightMob}`,
                                 top: `${item.backTopMob}`,
                                 right: `${item.backRightMob}`
                            }}></div>
                            <h4 className={styles.rates_item_heading}>{item.name}</h4>
                            <p className={styles.rates_item_text}>{item.subHead}</p>
                        </div>
                        <div className={styles.rates_main} style={signedIn && item.name === 'Beginner'? {border: '2px solid #FFB64F'} : {}}>
                            <h6 className={styles.rates_current} style={signedIn && item.name === 'Beginner'? {display: 'block'} : {display: 'none'}}>Текущий тариф</h6>
                            <h4 className={styles.rates_current_price}>{item.currentPrice}</h4>
                            <h5 className={styles.rates_prev_price}>{item.prevPrice}</h5>
                            <p className={styles.rates_price_info}>{item.credit}</p>
                            <h6 className={styles.rates_list_info_heading} style={item.credit === ' ' && windowWidth > 1440 ? {
                                marginTop: '91px'
                            } : windowWidth < 1440 ? {marginTop: '37px'} : {}}>В тариф входит:</h6>
                            <ul className={styles.rates_list_info}>
                                {item.info.map(el => {
                                    return (
                                        <li key={el} className={styles.rates_list_info_item} style={{
                                            backgroundImage: 'url(/imgs/main/check.svg)'
                                        }}>{el}</li>
                                    )
                                })}
                            </ul>
                            <button className={signedIn && item.name === 'Beginner' ? `${styles.rates_btn} ${styles.rates_btn_signed}` : `${styles.rates_btn}`}>{signedIn && item.name === 'Beginner' ? 'Перейти в личный кабинет' : 'Подробнее'}</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </section>
  )
}

export default MainRates;
