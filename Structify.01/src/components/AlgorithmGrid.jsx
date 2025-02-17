import React from 'react';
import AlgorithmCard from './AlgorithmCard';
import {useSearch} from '../contexts/SearchContext';


const algorithms = [
  {
    title: 'Linear Search',
    description: 'A simple search algorithm that checks every element in the list until a match is found or the end is reached.',
    symbol: '➡️'
  },
  {
    title: 'Binary Search',
    description: 'An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.',
    symbol: '🔍'
  },
  {
    title: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    symbol: '💭' 
  },
  {
    title: 'Selection Sort',
    description: 'A simple sorting algorithm that repeatedly selects the smallest (or largest) element from the unsorted part of the list and moves it to the sorted part.',
    symbol: '🎯'
  },
  {
    title: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the sorted list one item at a time by inserting elements into their correct position.',
    symbol: '📝'
  },
  {
    title: 'Counting Sort',
    description: 'A non-comparative algorithm that counts the frequency of each element and calculates their positions in the sorted array.',
    symbol: '📊'
  },
  {
    title: 'Bucket Sort',
    description: 'A distribution-based algorithm that divides elements into buckets and sorts each bucket individually.',
    symbol: '🪣'
  },
  {
    title: 'Merge Sort',
    description: 'A divide-and-conquer sorting algorithm that divides the array into halves, sorts them, and then merges the sorted halves.',
    symbol: '🔀'
  },
  {
    title: 'Quick Sort',
    description: 'An efficient, recursive divide-and-conquer sorting algorithm that partitions the array and sorts the partitions independently.',
    symbol: '⚡'
  },
  
  {
    title: 'Recursion',
    description: 'A problem-solving method where a function calls itself to solve smaller instances of the problem, often used with base cases to terminate recursion.',
    symbol: '🔁'
  },
  {
    title: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap to sort elements.',
    symbol: '🏔️'
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
  },
 
  {
    title: 'Dijkstra\'s Algorithm',
    description: 'Finds the shortest path between nodes in a weighted graph.',
    symbol: '🛤️'
  },
  {
    title: 'Kruskal\'s Algorithm',
    description: 'Finds the minimum spanning tree for a connected weighted graph by adding edges in increasing order of weight.',
    symbol: '🌉'
  },
  {
    title: 'Prim\'s Algorithm',
    description: 'Constructs the minimum spanning tree for a weighted graph by starting with a single vertex and growing the tree.',
    symbol: '🌲'
  },
  {
    title: 'Bellman-Ford Algorithm',
    description: 'Computes shortest paths from a single source vertex to all other vertices in a graph, even with negative weight edges.',
    symbol: '🕰️'
  },
  {
    title: 'Floyd-Warshall Algorithm',
    description: 'A dynamic programming algorithm to find shortest paths between all pairs of vertices in a graph.',
    symbol: '🔄'
  },
  {
    title: 'Knapsack Problem',
    description: 'Solves optimization problems where you select items with given weights and values to maximize value without exceeding the weight limit.',
    symbol: '🎒'
  },
  {
    title: 'Backtracking Algorithm',
    description: 'A problem-solving algorithm that explores all possible solutions by building a solution incrementally and abandoning solutions that fail.',
    symbol: '🔙'
  },
  {
    title: 'Dynamic Programming',
    description: 'A method for solving problems by breaking them down into simpler subproblems, solving each just once, and storing their solutions.',
    symbol: '💡'
  },
  {
    title: 'Greedy Algorithm',
    description: 'An algorithmic approach that makes the best choice at each step, assuming it will lead to the optimal solution.',
    symbol: '🤑'
  }
   
    
  ];







function AlgorithmGrid() {
  const { searchTerm } = useSearch();

  const filteredAlgorithms = algorithms.filter(algorithm =>
    algorithm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algorithm.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredAlgorithms.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>No algorithms found matching "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 p-6">
      {filteredAlgorithms.map((algorithm, index) => (
        <div key={index} className="flex justify-center">
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
