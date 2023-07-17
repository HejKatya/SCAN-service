import React from "react";
import styles from './Main.module.css';
import AppHeader from "../Header/AppHeader";
import AppFooter from "../Footer/AppFooter";
import MainHero from "./Hero/MainHero";
import MainSlider from "./Slider/MainSlider";
import MainRates from "./Rates/MainRates";
import AppAuthorization from "../Authorization/AppAuthorization";
import { useState } from 'react';


const AppMain = () => {
   
    return (
       <>
       <AppHeader />
            <main className={styles.main}>
                <MainHero />
                <MainSlider />
                <MainRates />
            </main>
            <AppFooter />   
       </>
    )
}

export default AppMain;