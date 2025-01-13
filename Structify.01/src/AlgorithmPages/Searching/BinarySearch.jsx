
// import './tailwind.css';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, RotateCcw, Code, BookOpen, RefreshCw } from 'lucide-react';

const DEFAULT_ARRAY_SIZE = 15;
const ANIMATION_DURATION = 0.5;

// ... (Button, Input, Card, PseudoCode, and Theory components remain unchanged)

function Button({ onClick, disabled, children, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-black text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center ${className}`}
    >
      {children}
    </button>
  )
}

function Input({ type, placeholder, onChange, className, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  )
}

function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  )
}

export default function BinarySearch() {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepDescriptions, setStepDescriptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    generateDefaultArray();
  }, []);

  const generateDefaultArray = () => {
    const newArray = Array.from({ length: DEFAULT_ARRAY_SIZE }, (_, i) => i * 2 + 1);
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
      if (!isSorted(newArray)) throw new Error('Array must be sorted in ascending order');
      setArray(newArray);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    const steps = [];
    const descriptions = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({ left, right, mid, found: arr[mid] === target });
      
      descriptions.push(`Searching between indices ${left} and ${right}. Middle index is ${mid} with value ${arr[mid]}.`);

      if (arr[mid] === target) {
        descriptions.push(`Found target ${target} at index ${mid}.`);
        return [steps, descriptions];
      } else if (arr[mid] < target) {
        left = mid + 1;
        descriptions.push(`${arr[mid]} is less than ${target}. Searching right half.`);
      } else {
        right = mid - 1;
        descriptions.push(`${arr[mid]} is greater than ${target}. Searching left half.`);
      }
    }

    steps.push({ left, right, mid: -1, found: false });
    descriptions.push(`Target ${target} not found in the array.`);
    return [steps, descriptions];
  };

  const handleSearch = () => {
    if (target !== null) {
      const [searchSteps, searchDescriptions] = binarySearch(array, target);
      setSteps(searchSteps);
      setStepDescriptions(searchDescriptions);
      setCurrentStep(0);
      setIsSearching(true);
    }
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setIsSearching(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto dark:bg-gray-800"> {/* Updated for dark mode */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white"> {/* Updated for dark mode */}
          Binary Search Visualization
        </h2>
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-grow flex items-center gap-2">
              <Input
                type="number"
                placeholder="Enter number"
                onChange={(e) => setTarget(parseInt(e.target.value))}
                className="w-32 dark:bg-gray-700 dark:text-white" /* Updated for dark mode */
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
              <Button onClick={handleReset} disabled={!isSearching}>
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
              className="w-full dark:bg-gray-700 dark:text-white" /* Updated for dark mode */
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <Button onClick={generateDefaultArray} className="text-sm">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset to Default Array
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {array.map((num, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs mb-1 text-gray-400 dark:text-gray-300">{index}</div> {/* Updated for dark mode */}
              <motion.div
                className={`w-10 h-10 flex items-center justify-center border ${
                  currentStep >= 0 &&
                  index >= steps[currentStep].left &&
                  index <= steps[currentStep].right
                    ? 'border-blue-500'
                    : 'border-gray-300'
                } ${
                  currentStep >= 0 && index === steps[currentStep].mid
                    ? 'bg-yellow-200'
                    : ''
                } ${
                  currentStep >= 0 &&
                  steps[currentStep].found &&
                  index === steps[currentStep].mid
                    ? 'bg-green-200'
                    : ''
                } relative`}
                animate={{
                  scale: currentStep >= 0 && index === steps[currentStep].mid ? 1.1 : 1,
                }}
                transition={{ duration: ANIMATION_DURATION }}
              >
                <span className="text-gray-900 dark:text-white">{num}</span> {/* Updated for dark mode */}
              </motion.div>
              {currentStep >= 0 && (
                <>
                  {index === steps[currentStep].left && (
                    <span className="absolute -bottom-6 left-0 text-xs text-blue-500">L</span>
                  )}
                  {index === steps[currentStep].right && (
                    <span className="absolute -bottom-6 right-0 text-xs text-blue-500">R</span>
                  )}
                  {index === steps[currentStep].mid && (
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-500">M</span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 my-4">
          <Button onClick={handleStepBackward} disabled={currentStep <= 0 || !isSearching}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous Step
          </Button>
          <Button onClick={handleStepForward} disabled={currentStep >= steps.length - 1 || !isSearching}>
            Next Step <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {currentStep >= 0 && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md"> {/* Updated for dark mode */}
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Current Step:</h3> {/* Updated for dark mode */}
            <p className="dark:text-gray-300">{stepDescriptions[currentStep]}</p> {/* Updated for dark mode */}
          </div>
        )}
        {currentStep >= 0 && (
          <div className="text-center mt-4 dark:text-white"> {/* Updated for dark mode */}
            {steps[currentStep].found
              ? `Found ${target} at index ${steps[currentStep].mid}`
              : currentStep === steps.length - 1
              ? `${target} not found in the array`
              : `Searching...`}
          </div>
        )}
        {showPseudoCode && <PseudoCode />}
        {showTheory && <Theory />}
      </div>
    </Card>
  );
}