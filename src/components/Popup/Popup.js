import React from "react";
import styles from './Popup.module.css';

const Popup = ({active, setActive, children}) => {
  return (
    <div className={active ? `${styles.container} ${styles.active}` : `${styles.container}`} onClick={() => setActive(false)}>
        <div className={active ? `${styles.content} ${styles.active}` : `${styles.content}`} onClick={e => e.stopPropagation()}>
        <img className={styles.cross} src="/imgs/results/cross.svg" alt="cross that closes the window" onClick={() => setActive(false)}/>
            {children}
        </div>
    </div>
  )
}

export default Popup