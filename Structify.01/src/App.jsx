import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout'
import './App.css';
import BinarySearch from './AlgorithmPages/BinarySearch';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}/>
        <Route path="/binary-search" element={<BinarySearch/>}/>
      </Routes>
    </Router>
  );
}

export default App;