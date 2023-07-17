import styles from '../Main.module.css';
import React from 'react';
import { useContext } from 'react';
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
        backWidth: '92.244px',
        backHeight: '83.145px',
        backTop: '11px',
        backRight: '15.76px'
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
        backWidth: '119.96px',
        backHeight: '118.76px',
        backTop: '0',
        backRight: '0'
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
        backWidth: '96px',
        backHeight: '80.09px',
        backTop: '23px',
        backRight: '5px'
    }
]

const MainRates = () => {
    const [signedIn, setSignedIn] = useContext(MyContext)

  return (
    <section className={styles.rates_section}>
        <h2 className={styles.rates_heading}>НАШИ ТАРИФЫ</h2>
        <ul className={styles.rates_list}>
            {ratesInfo.map(item => {
                return (
                    <li key={item.name} className={styles.rates_item}>
                        <div className={styles.rates_item_header} style={{
                            backgroundColor: `${item.backColor}`,
                            color: `${item.color}`
                        }}>
                            <div className={styles.rates_background_img} style={{
                                 backgroundImage: `url(${item.imgUrl})`,
                                 width: `${item.backWidth}`,
                                 height: `${item.backHeight}`,
                                 top: `${item.backTop}`,
                                 right: `${item.backRight}`
                            }}></div>
                            <h4 className={styles.rates_item_heading}>{item.name}</h4>
                            <p className={styles.rates_item_text}>{item.subHead}</p>
                        </div>
                        <div className={styles.rates_main}>
                            <h6 className={styles.rates_current} style={!signedIn ? {display: 'none'} : {}}>Текущий тариф</h6>
                            <h4 className={styles.rates_current_price}>{item.currentPrice}</h4>
                            <h5 className={styles.rates_prev_price}>{item.prevPrice}</h5>
                            <p className={styles.rates_price_info}>{item.credit}</p>
                            <h6 className={styles.rates_list_info_heading} style={item.credit === ' ' ? {
                                marginTop: '91px'
                            } : {}}>В тариф входит:</h6>
                            <ul className={styles.rates_list_info}>
                                {item.info.map(el => {
                                    return (
                                        <li key={el} className={styles.rates_list_info_item} style={{
                                            backgroundImage: 'url(/imgs/main/check.svg)'
                                        }}>{el}</li>
                                    )
                                })}
                            </ul>
                            <button className={styles.rates_btn}>Подробнее</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </section>
  )
}

export default MainRates;
