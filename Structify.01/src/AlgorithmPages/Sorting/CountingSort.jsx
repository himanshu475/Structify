'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, StepForward, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const ANIMATION_DURATION = 0.5;

const Button = ({ onClick, disabled, children, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-black text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center dark:bg-gray-600 dark:text-white ${className}`}
  >
    {children}
  </button>
);

const Input = ({ type, placeholder, onChange, value, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
  />
);

const Card = ({ children, className }) => (
  <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg ${className}`}>{children}</div>
);

const CountingSort = () => {
  const [array, setArray] = useState([4, 2, 8, 3, 1, 9, 6, 5, 7]);
  const [countArray, setCountArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [explanation, setExplanation] = useState('Click Play or Step Forward to start the visualization');
  const [showTheory, setShowTheory] = useState(false);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [uniqueNumbers, setUniqueNumbers] = useState([]);

  useEffect(() => {
    setUniqueNumbers([...new Set(array)].sort((a, b) => a - b));
  }, [array]);

  const validateAndSetArray = (input) => {
    setInputError('');
    const numbers = input.trim().split(/[,\s]+/).map(Number).filter(num => !isNaN(num) && num >= 0 && num <= 999);
    
    if (numbers.length === 0) {
      setInputError('Please enter some valid numbers');
      return;
    }

    if (numbers.length > 15) {
      setInputError('Please enter at most 15 numbers');
      return;
    }

    setArray(numbers);
    resetState();
    setCustomInput(numbers.join(', '));
  };

  const resetState = () => {
    setCountArray([]);
    setSortedArray([]);
    setCurrentStep(0);
    setIsAutoPlaying(false);
    setExplanation('Click Play or Step Forward to start the visualization');
  };

  const initializeCountArray = () => {
    const counts = new Array(Math.max(...array) + 1).fill(0);
    setCountArray(counts);
    setExplanation('Initialize count array with zeros');
  };

  const countOccurrences = () => {
    const counts = new Array(Math.max(...array) + 1).fill(0);
    array.forEach(num => counts[num]++);
    setCountArray(counts);
    setExplanation('Count occurrences of each number');
  };

  const calculateCumulativeCounts = () => {
    const newCounts = [...countArray];
    for (let i = 1; i < newCounts.length; i++) newCounts[i] += newCounts[i - 1];
    setCountArray(newCounts);
    setExplanation('Calculate cumulative counts');
  };

  const buildSortedArray = () => {
    const counts = [...countArray];
    const output = new Array(array.length);
    for (let i = array.length - 1; i >= 0; i--) {
      const num = array[i];
      output[counts[num] - 1] = num;
      counts[num]--;
    }
    setSortedArray(output);
    setExplanation('Build sorted array using cumulative counts');
  };

  const steps = [
    initializeCountArray,
    countOccurrences,
    calculateCumulativeCounts,
    buildSortedArray,
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      steps[currentStep]();
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (isAutoPlaying && currentStep < steps.length) {
      const timer = setTimeout(nextStep, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, currentStep]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Counting Sort Visualization</h1>

        <div className="mb-8">
          <div className="mb-6">
            <label htmlFor="customArray" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter your numbers (comma or space separated):
            </label>
            <div className="flex gap-4">
              <Input
                type="text"
                id="customArray"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g., 4, 2, 8, 3, 1"
                className="flex-1"
              />
              <Button onClick={() => validateAndSetArray(customInput)}>
                Update Array
              </Button>
            </div>
            {inputError && (
              <div className="mt-2 flex items-center gap-2 text-red-600">
                <AlertCircle size={16} />
                <span className="text-sm">{inputError}</span>
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Original Array</h2>
          <div className="flex gap-2 mb-6 flex-wrap">
            {array.map((num, idx) => (
              <motion.div
                key={idx}
                className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-lg"
                animate={{ scale: currentStep > 0 ? 1.1 : 1 }}
                transition={{ duration: ANIMATION_DURATION }}
              >
                {num}
              </motion.div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Count Array</h2>
          <div className="flex gap-2 mb-6 flex-wrap">
            {uniqueNumbers.map((num) => (
              <motion.div
                key={num}
                className="w-12 h-12 flex flex-col items-center justify-center bg-yellow-500 text-white rounded-lg"
                animate={{ scale: currentStep > 1 ? 1.1 : 1 }}
                transition={{ duration: ANIMATION_DURATION }}
              >
                <div className="text-xs">{num}</div>
                <div>{countArray[num] || 0}</div>
              </motion.div>
            ))}
          </div>

          {sortedArray.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Sorted Array</h2>
              <div className="flex gap-2 flex-wrap">
                {sortedArray.map((num, idx) => (
                  <motion.div
                    key={idx}
                    className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-lg"
                    animate={{ scale: 1.1 }}
                    transition={{ duration: ANIMATION_DURATION }}
                  >
                    {num}
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{explanation}</p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsAutoPlaying(!isAutoPlaying)} disabled={currentStep >= steps.length}>
              {isAutoPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isAutoPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={nextStep} disabled={currentStep >= steps.length}>
              <StepForward className="mr-2 h-4 w-4" />
              Step Forward
            </Button>
            <Button onClick={resetState}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Button onClick={() => setShowTheory(!showTheory)} className="w-full justify-between">
            <span className="text-xl font-semibold">Why Counting Sort?</span>
            {showTheory ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </Button>

          {showTheory && (
            <Card className="p-6">
              <div className="prose max-w-none dark:prose-invert">
                <h3 className="text-lg font-semibold mb-4">Time and Space Complexity</h3>
                <div className="mb-4">
                  <p className="font-semibold">Time Complexity: O(n + k)</p>
                  <ul className="list-disc pl-6">
                    <li>Where n is the number of elements in the input array</li>
                    <li>Where k is the range of the input values (maximum value in the input)</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Space Complexity: O(k)</p>
                  <p>Requires extra space for the count array (size k).</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4 mt-8">
          <Button onClick={() => setShowPseudocode(!showPseudocode)} className="w-full justify-between">
            <span className="text-xl font-semibold">Pseudocode</span>
            {showPseudocode ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </Button>

          {showPseudocode && (
            <Card className="p-6">
              <pre className="font-mono bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {`CountingSort(array[]):
    maxNum = max(array)
    countArray = new Array(maxNum + 1).fill(0)
    for each num in array:
        countArray[num]++
    for i from 1 to countArray.length:
        countArray[i] += countArray[i - 1]
    output = new Array(array.length)
    for i from array.length - 1 to 0:
        num = array[i]
        output[countArray[num] - 1] = num
        countArray[num]--
    return output`}
                </code>
              </pre>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CountingSort;
