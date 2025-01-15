'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, RotateCcw, Code, BookOpen, RefreshCw } from 'lucide-react';

const DEFAULT_ARRAY_SIZE = 10;
const ANIMATION_DURATION = 0.5;

function Button({ onClick, disabled, children, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-black text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center dark:bg-gray-600 dark:text-white ${className}`}
    >
      {children}
    </button>
  );
}

function Input({ type, placeholder, onChange, className, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
    />
  );
}

function Card({ children, className }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  );
}

function PseudoCode() {
  return (
    <Card className="mt-4 bg-white dark:bg-gray-800">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Insertion Sort Pseudo-code</h3>
        <pre className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-md overflow-x-auto">
          {`function insertionSort(arr):
    n = arr.length
    for i from 1 to n-1:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j = j - 1
        arr[j + 1] = key
    return arr`}
        </pre>
      </div>
    </Card>
  );
}

function Theory() {
  return (
    <Card className="mt-4">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Insertion Sort Theory</h3>
        <p className="mb-2">
          Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
        </p>
        <h4 className="font-semibold mt-2">How it works:</h4>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Start with the second element (index 1)</li>
          <li>Compare it with the elements before it</li>
          <li>If the element is smaller, shift the larger elements to the right</li>
          <li>Insert the element in its correct position</li>
          <li>Move to the next element and repeat steps 2-4 until the end of the array</li>
        </ol>
        <h4 className="font-semibold mt-2">Characteristics:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Time Complexity: O(n²) - not efficient for large datasets</li>
          <li>Space Complexity: O(1) - only requires a constant amount of additional memory space</li>
          <li>Stable sorting algorithm</li>
          <li>Adaptive: efficient for data sets that are already substantially sorted</li>
          <li>Simple implementation</li>
          <li>Efficient for small data sets</li>
        </ul>
      </div>
    </Card>
  );
}

export default function InsertionSort() {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepDescriptions, setStepDescriptions] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: DEFAULT_ARRAY_SIZE }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setCustomArrayInput(newArray.join(', '));
  };

  const handleCustomArrayInput = (input) => {
    setCustomArrayInput(input);
    try {
      const newArray = input.split(',').map(num => {
        const parsed = parseInt(num.trim(), 10);
        if (isNaN(parsed)) throw new Error('Invalid number');
        return parsed;
      });
      if (newArray.length === 0) throw new Error('Array is empty');
      if (newArray.length > 20) throw new Error('Array size should not exceed 20 elements');
      setArray(newArray);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const insertionSort = (arr) => {
    const steps = [];
    const descriptions = [];
    const n = arr.length;
    const sortedArr = [...arr];

    for (let i = 1; i < n; i++) {
      let key = sortedArr[i];
      let j = i - 1;

      steps.push({ array: [...sortedArr], current: i, comparing: [i, j] });
      descriptions.push(`Start inserting element ${key} at index ${i}`);

      while (j >= 0 && sortedArr[j] > key) {
        sortedArr[j + 1] = sortedArr[j];
        j = j - 1;

        steps.push({ array: [...sortedArr], current: i, comparing: [j + 1, j], shifting: true });
        descriptions.push(`Shift ${sortedArr[j + 1]} to the right`);
      }

      sortedArr[j + 1] = key;
      steps.push({ array: [...sortedArr], current: i, inserting: j + 1 });
      descriptions.push(`Insert ${key} at index ${j + 1}`);
    }

    return [steps, descriptions];
  };

  const handleSort = () => {
    const [sortSteps, sortDescriptions] = insertionSort([...array]);
    setSteps(sortSteps);
    setStepDescriptions(sortDescriptions);
    setCurrentStep(0);
    setIsSorting(true);
    setIsSorted(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setArray(steps[currentStep + 1].array);
      if (currentStep + 1 === steps.length - 1) {
        setIsSorted(true);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setArray(steps[currentStep - 1].array);
    }
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setIsSorting(false);
    setIsSorted(false);
    generateRandomArray();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Insertion Sort Visualization</h2>
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-grow flex items-center gap-2">
              <Button onClick={handleSort} disabled={isSorting}>
                <Play className="mr-2 h-4 w-4" /> Sort
              </Button>
              <Button onClick={handleReset} disabled={!isSorting}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowPseudoCode(!showPseudoCode)} className="text-sm">
                <Code className="mr-2 h-4 w-4" /> {showPseudoCode ? 'Hide Code' : 'Show Code'}
              </Button>
              <Button onClick={() => setShowTheory(!showTheory)} className="text-sm">
                <BookOpen className="mr-2 h-4 w-4" /> {showTheory ? 'Hide Theory' : 'Show Theory'}
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="Enter custom array (comma-separated)"
              value={customArrayInput}
              onChange={(e) => handleCustomArrayInput(e.target.value)}
              className="w-full"
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <Button onClick={generateRandomArray} className="text-sm">
              <RefreshCw className="mr-2 h-4 w-4" /> Generate Random Array
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {array.map((num, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 flex items-center justify-center border ${
                  currentStep >= 0 && steps[currentStep].current === index
                    ? 'bg-blue-200 dark:bg-blue-700 border-blue-500 dark:border-blue-400'
                    : currentStep >= 0 && steps[currentStep].comparing && steps[currentStep].comparing.includes(index)
                    ? steps[currentStep].shifting
                      ? 'bg-green-200 dark:bg-green-700 border-green-500 dark:border-green-400'
                      : 'bg-yellow-200 dark:bg-yellow-700 border-yellow-500 dark:border-yellow-400'
                    : currentStep >= 0 && steps[currentStep].inserting === index
                    ? 'bg-purple-200 dark:bg-purple-700 border-purple-500 dark:border-purple-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                animate={{
                  scale: currentStep >= 0 && (steps[currentStep].comparing?.includes(index) || steps[currentStep].inserting === index || steps[currentStep].current === index) ? 1.1 : 1,
                }}
                transition={{ duration: ANIMATION_DURATION }}
              >
                <span className="text-gray-900 dark:text-white">{num}</span>
              </motion.div>
              <div className="text-xs mt-1 text-gray-500">{index}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 my-4">
          <Button onClick={handleStepBackward} disabled={currentStep <= 0 || !isSorting}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous Step
          </Button>
          <Button onClick={handleStepForward} disabled={currentStep >= steps.length - 1 || !isSorting}>
            Next Step <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {currentStep >= 0 && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Current Step:</h3>
            <p className="text-gray-900 dark:text-white">{stepDescriptions[currentStep]}</p>
          </div>
        )}
        {isSorted && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <p className="text-green-700 font-semibold">Array is now fully sorted!</p>
          </div>
        )}
        {showPseudoCode && <PseudoCode />}
        {showTheory && <Theory />}
      </div>
    </Card>
  );
}

