import React, {useRef} from 'react'
import styles from '../Main.module.css'

const MainSlider = () => {
    const sliderRef = useRef()
    const itemRef = useRef()

    const sliderInfo = [
        {
            text: 'Высокая и оперативная скорость обработки заявки',
            imgUrl: '(/imgs/main/clock.svg)' 
        }, 
        {
            text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
            imgUrl: '(/imgs/main/magnifying-glass.svg)' 
        }, 
        {
            text: '  Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
            imgUrl: '(/imgs/main/lock.svg)' 
        }, 
        {
            text: 'Высокая и оперативная скорость обработки заявки',
            imgUrl: '(/imgs/main/clock.svg)' 
        }, 
        {
            text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
            imgUrl: '(/imgs/main/magnifying-glass.svg)' 
        }, 
        {
            text: '  Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
            imgUrl: '(/imgs/main/lock.svg)' 
        }
    ]
    
    const slideLeft = () => {
        let gap = window.getComputedStyle(sliderRef.current).gap
        gap = Number(gap.slice(0, gap.length - 2)) + 20
        sliderRef.current.scrollLeft -= (itemRef.current.clientWidth + gap)
    }

    const slideRight = () => {
        let gap = window.getComputedStyle(sliderRef.current).gap
        gap = Number(gap.slice(0, gap.length - 2)) + 20
        sliderRef.current.scrollLeft += (itemRef.current.clientWidth + gap)
        console.log(itemRef.current.clientWidth + gap)
    }

    return (
          <section className={styles.slider_section} style={{
            backgroundImage: "url(/imgs/main/slider-banner.svg)"
          }}>
            <h2 className={styles.sub_heading}>Почему именно мы</h2>
            <div className={styles.slider}>
                <div onClick={slideLeft} className={styles.left_arrow} style={{
                        backgroundImage: 'url(/imgs/main/left-arrow.svg)'
                    }}></div>
                <ul ref={sliderRef} className={styles.slider_list}>
                    {sliderInfo.map(item => {
                        return (
                            <li key={sliderInfo.indexOf(item)} ref={itemRef} className={styles.slider_item} style={{
                                backgroundImage: `url${item.imgUrl}`
                            }}>
                            {item.text}
                            </li>
                        )
                    })}
                </ul>
                <div onClick={slideRight} className={styles.right_arrow} style={{
                        backgroundImage: 'url(/imgs/main/right-arrow.svg)'
                    }}></div>
            </div>
          </section> 
    )
}

export default MainSlider;