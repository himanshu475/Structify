import React from 'react';
import styles from '../styles/AlgorithmCard.module.css';
import {Link} from 'react-router-dom';

const AlgorithmCard=({title, description, symbol})=>{
  const getButtonLink=(title)=>{
    const routes = {
      //searching
      'Binary Search': '/binary-search',
      'Linear Search': '/linear-search',

      //sorting
      'Bubble Sort': '/bubble-sort',
      'Quick Sort': '/quick-sort',
      'Merge Sort':'/merge-sort',
      'Selection Sort':'/selection-sort',
      'Heap Sort':'/heap-sort',
      'Insertion Sort':'/insertion-sort',
      'Counting Sort':'/counting-sort',
      'Bucket Sort':'/bucket-sort',


      //graph
      'Depth-First Search':'/depth-first-search',
      'Breadth-First Search':'/breadth-first-search',
      'Dijkstra\'s Algorithm':'/dijkstras',
      'Bellman-Ford Algorithm':'/bellman-ford',
      'Floyd-Warshall Algorithm':'/Floyd-warshall',
      'Kruskal\'s Algorithm':'/Krushkals',
      'Prim\'s Algorithm':'/Prims',

      //recursion
      'Recursion':'/recursion',

      //Dp
      'Knapsack Problem':'/knapsack',
      'Dynamic Programming':'/dynamic',
      'Backtracking Algorithm':'/backtrack',

      //Greedy
      'Greedy Algorithm':'/greedy',


    };
  
    // Return the corresponding route or '#' if the title is not in the map
    return routes[title] || '#';
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