import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, StepForward, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const ANIMATION_DURATION = 0.5;
const BUCKET_COUNT = 10;

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

const BucketSort = () => {
  const [array, setArray] = useState([0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]);
  const [buckets, setBuckets] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [explanation, setExplanation] = useState('Click Play or Step Forward to start the visualization');
  const [showTheory, setShowTheory] = useState(false);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState('');

  const validateAndSetArray = (input) => {
    setInputError('');
    const numbers = input.trim().split(/[,\s]+/)
      .map(Number)
      .filter(num => !isNaN(num) && num >= 0 && num <= 1);
    
    if (numbers.length === 0) {
      setInputError('Please enter valid numbers between 0 and 1');
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
    setBuckets([]);
    setSortedArray([]);
    setCurrentStep(0);
    setIsAutoPlaying(false);
    setExplanation('Click Play or Step Forward to start the visualization');
  };

  const createBuckets = () => {
    const newBuckets = Array.from({ length: BUCKET_COUNT }, () => []);
    array.forEach(num => {
      const bucketIndex = Math.min(Math.floor(num * BUCKET_COUNT), BUCKET_COUNT - 1);
      newBuckets[bucketIndex].push(num);
    });
    setBuckets(newBuckets);
    setExplanation('Distribute elements into buckets based on their value ranges');
  };

  const sortBuckets = () => {
    const newBuckets = buckets.map(bucket => 
      [...bucket].sort((a, b) => a - b)
    );
    setBuckets(newBuckets);
    setExplanation('Sort elements within each bucket');
  };

  const concatenateBuckets = () => {
    const sorted = buckets.flat();
    setSortedArray(sorted);
    setExplanation('Concatenate all buckets to get the final sorted array');
  };

  const steps = [
    createBuckets,
    sortBuckets,
    concatenateBuckets,
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Bucket Sort Visualization</h1>

        <div className="mb-8">
          <div className="mb-6">
            <label htmlFor="customArray" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter numbers between 0 and 1 (comma or space separated):
            </label>
            <div className="flex gap-4">
              <Input
                type="text"
                id="customArray"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g., 0.78, 0.17, 0.39"
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
                className="w-20 h-12 flex items-center justify-center bg-blue-500 text-white rounded-lg"
                animate={{ scale: currentStep > 0 ? 1.1 : 1 }}
                transition={{ duration: ANIMATION_DURATION }}
              >
                {num.toFixed(2)}
              </motion.div>
            ))}
          </div>

          {buckets.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Buckets</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {buckets.map((bucket, idx) => (
                  <div key={idx} className="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Bucket {idx} ({(idx/BUCKET_COUNT).toFixed(1)}-{((idx+1)/BUCKET_COUNT).toFixed(1)})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bucket.map((num, numIdx) => (
                        <motion.div
                          key={numIdx}
                          className="w-20 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-lg"
                          animate={{ scale: currentStep > 1 ? 1.1 : 1 }}
                          transition={{ duration: ANIMATION_DURATION }}
                        >
                          {num.toFixed(2)}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {sortedArray.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Sorted Array</h2>
              <div className="flex gap-2 flex-wrap">
                {sortedArray.map((num, idx) => (
                  <motion.div
                    key={idx}
                    className="w-20 h-12 flex items-center justify-center bg-green-500 text-white rounded-lg"
                    animate={{ scale: 1.1 }}
                    transition={{ duration: ANIMATION_DURATION }}
                  >
                    {num.toFixed(2)}
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
            <span className="text-xl font-semibold">Why Bucket Sort?</span>
            {showTheory ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </Button>

          {showTheory && (
            <Card className="p-6">
              <div className="prose max-w-none dark:prose-invert">
                <h3 className="text-lg font-semibold mb-4">Time and Space Complexity</h3>
                <div className="mb-4">
                  <p className="font-semibold">Time Complexity:</p>
                  <ul className="list-disc pl-6">
                    <li>Average Case: O(n + k)</li>
                    <li>Worst Case: O(n²) when most elements fall into the same bucket</li>
                    <li>Where n is the number of elements and k is the number of buckets</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Space Complexity: O(n + k)</p>
                  <p>Requires extra space for the buckets.</p>
                </div>
                <div>
                  <p className="font-semibold">Best Used When:</p>
                  <ul className="list-disc pl-6">
                    <li>Input is uniformly distributed over a range</li>
                    <li>Floating point numbers need to be sorted</li>
                    <li>Linear time sorting is needed</li>
                  </ul>
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
                  {`BucketSort(array[], bucketSize):
    buckets = create array of bucketSize empty lists
    
    // Distribute elements into buckets
    for each num in array:
        index = floor(num * bucketSize)
        append num to buckets[index]
    
    // Sort individual buckets
    for each bucket in buckets:
        sort bucket using insertion sort
    
    // Concatenate all buckets
    result = empty array
    for each bucket in buckets:
        append all elements in bucket to result
    return result`}
                </code>
              </pre>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BucketSort;