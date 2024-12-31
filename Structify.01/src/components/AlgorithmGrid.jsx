import React from 'react';
import AlgorithmCard from './AlgorithmCard';
import styles from '../styles/AlgorithmGrid.module.css';
import {useSearch} from '../contexts/SearchContext';


const algorithms = [
    {
      title: 'Binary Search',
      description: 'An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.',
      symbol: '🔍'
    },
   
    {
      title: 'Linear Search',
      description: 'A simple search algorithm that checks every element in the list until a match is found or the end is reached.',
      symbol: '➡️'
    },
    {
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      symbol: '🫧'
    },
    {
      title: 'Quick Sort',
      description: 'An efficient, recursive divide-and-conquer sorting algorithm that partitions the array and sorts the partitions independently.',
      symbol: '⚡'
    },
    {
      title: 'Depth-First Search',
      description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
      symbol: '🌳'
    },
    {
      title: 'Breadth-First Search',
      description: 'A graph traversal algorithm that explores all the vertices of a graph at the present depth prior to moving on to the vertices at the next depth level.',
      symbol: '🌊'
    }
  ];

function AlgorithmGrid(){
  const {searchTerm}=useSearch();

  const filteredAlgorithms=algorithms.filter(algorithm=>
    algorithm.title.toLowerCase().includes(searchTerm.toLowerCase())||
    algorithm.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(filteredAlgorithms.length==0){
    return (
      <div className={styles.noResult}>
        <p>No algorithms found matching "{searchTerm}"</p>
      </div>
    )
  }

    return (
        <div className={styles.grid}>
          {filteredAlgorithms.map((algorithm, index) => (
            <div key={index} className={styles.gridItem}>
              <AlgorithmCard 
                title={algorithm.title} 
                description={algorithm.description} 
                symbol={algorithm.symbol}
              />
            </div>
          ))}
        </div>
      );

}

export default AlgorithmGrid;