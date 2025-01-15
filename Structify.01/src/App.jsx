import React from "react";
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout'
import './App.css';

import BinarySearch from './AlgorithmPages/Searching/BinarySearch'
import LinearSearch from "./AlgorithmPages/Searching/LinearSearch";

//sorting
import QuickSort from "./AlgorithmPages/Sorting/QuickSort";
import BubbleSort from "./AlgorithmPages/Sorting/BubbleSort";
import HeapSort from "./AlgorithmPages/Sorting/HeapSort";
import MergeSort from "./AlgorithmPages/Sorting/MergeSort";
import SelectionSort from "./AlgorithmPages/Sorting/SelectionSort";
import InsertionSort from "./AlgorithmPages/Sorting/InsertionSort";
import CountingSort from "./AlgorithmPages/Sorting/CountingSort";
import BucketSort from "./AlgorithmPages/Sorting/BucketSort";

import DepthFirstSearch from "./AlgorithmPages/Graph/DepthFirstSearch";
import BreadthFirstSearch from "./AlgorithmPages/Graph/BreadthFirstSearch";
import Dijkstras from "./AlgorithmPages/Graph/Dijkstras"
import BellmanFord from "./AlgorithmPages/Graph/BellmanFord"
import FloydWarshall from "./AlgorithmPages/Graph/FloydWarshall"
import KrushKals from "./AlgorithmPages/Graph/Krushkals"
import Prims from "./AlgorithmPages/Graph/Prims"

import Recursion from './AlgorithmPages/Recursion/Recursion'

import Knapsack from './AlgorithmPages/DP/Knapsack'
import Dynamic from './AlgorithmPages/DP/Dynamic'
import BackTrack from './AlgorithmPages/DP/BackTrack'

import Greedy from './AlgorithmPages/Greedy/Greedy'

function App() {
  return (
    <Router>
      {/* Add the Analytics component here to track all pages */}
      <Analytics />
      <Routes>
        <Route path="/" element={<MainLayout/>}/>
        <Route path="/binary-search" element={<BinarySearch/>}/>
        <Route path="/linear-search"  element={<LinearSearch/>}/>

        <Route path="/bubble-sort"  element={<BubbleSort/>}/>
        <Route path="/quick-sort"  element={<QuickSort/>}/>
        <Route path="/heap-sort" element={<HeapSort/>}/>
        <Route path="/merge-sort" element={<MergeSort/>}/>
        <Route path="/selection-sort" element={<SelectionSort/>}/>
        <Route path="/insertion-sort" element={<InsertionSort/>}/>
        <Route path="/counting-sort" element={<CountingSort/>} />
        <Route path="/bucket-sort" element={<BucketSort/>} />


        <Route path="/depth-first-search"  element={<DepthFirstSearch/>}/>
        <Route path="/breadth-first-search"  element={<BreadthFirstSearch/>}/>
        <Route path="/dijkstras" element={<Dijkstras/>}/>
        <Route path="/bellman-ford" element={<BellmanFord/>}/>
        <Route path="/Floyd-warshall" element={<FloydWarshall/>} />
        <Route path="/Krushkals" element={<KrushKals/>} />
        <Route path="/Prims" element={<Prims/>} />

        <Route path="/recursion" element={<Recursion/>} />

        <Route path="/knapsack" element={<Knapsack/>} />
        <Route path="/dynamic" element={<Dynamic/>} />
        <Route path="/backtrack" element={<BackTrack/>} />

        <Route path="/greedy" element={<Greedy/>} />



      </Routes>
    </Router>
  );
}

export default App;
