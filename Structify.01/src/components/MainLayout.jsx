/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Navbar from "./Navbar";
import Hero from './Hero';
import SearchBar from './SearchBar';
import styles from '../styles/MainLayout.module.css';
import AlgorithmGrid from "./AlgorithmGrid";
import { SearchProvider } from "../contexts/SearchContext";
import Footer from "./Footer";


function MainLayout({ children }) {

   


    return (
        <SearchProvider>
        <div className={styles.layout}>
            <Navbar/>
            <main className={styles.main}>
                <Hero/>
                <SearchBar/>
                <AlgorithmGrid/> 
                
            </main>
            <Footer/>

        </div>
        </SearchProvider>
    );


}

export default MainLayout;