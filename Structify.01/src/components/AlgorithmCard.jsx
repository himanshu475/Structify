import React from 'react';
import styles from '../styles/AlgorithmCard.module.css';
import {Link} from 'react-router-dom';

const AlgorithmCard=({title, description, symbol})=>{
  const getButtonLink=(title)=>{
    if(title==='Binary Search'){
      return '/binary-search';
    }
    if(title==='Linear Search'){
      return '/linear-search';
    }

    return '#';
  }

  
  return (
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.symbol}>{symbol}</div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
             <Link to={getButtonLink(title)} className={styles.button}>
            Visualize and Learn
            </Link>
          </div>
        </div>
      );
}

export default AlgorithmCard;