import React, {useRef, useState, useEffect} from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '../Main.module.css';

const MainSlider = () => {
    const sliderRef = useRef()
    const itemRef = useRef()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1099 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1099, min: 670 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 670, min: 0 },
          items: 1
        }
      };

      const CustomLeftArrow = (arrowProps) => { 
        const {carouselState, children, ...restArrowProps} = arrowProps;
        return ( 
        <button style={{backgroundImage: 'url(/imgs/main/left-arrow.svg)'}} className={styles.left_arrow} {...restArrowProps}></button> );
     };

     const CustomRightArrow = (arrowProps) => { 
        const {carouselState, children, ...restArrowProps} = arrowProps;
        return ( 
        <button style={{backgroundImage: 'url(/imgs/main/right-arrow.svg)'}} className={styles.right_arrow} {...restArrowProps}></button> );
     };

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
          <section className={styles.slider_section}>
            <h2 className={styles.sub_heading}>Почему именно мы</h2>
            <div className={styles.slider}>
                <Carousel infiniteLoop={true}
                 responsive={responsive}
                 className={styles.slider_list}
                 customLeftArrow={<CustomLeftArrow></CustomLeftArrow>}
                 customRightArrow={<CustomRightArrow></CustomRightArrow>}>
                    {sliderInfo.map(item => {
                        return (
                            <div key={sliderInfo.indexOf(item)} ref={itemRef} className={styles.slider_item} style={{
                                backgroundImage: `url${item.imgUrl}`
                            }}>
                            {item.text}
                            </div>
                        )
                    })}
                </Carousel>
            </div>
            <div className={styles.slider_background} style={windowWidth > 800 ? {
            backgroundImage: "url(/imgs/main/slider-banner.svg)"
          } : {
            backgroundImage: "url(/imgs/main/slider-mobile.svg)"
          }}></div>
          </section> 
    )
}

export default MainSlider;