'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, RotateCcw, Code, BookOpen, RefreshCw } from 'lucide-react'

const DEFAULT_ARRAY_SIZE = 10
const ANIMATION_DURATION = 0.5

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

function PseudoCode() {
  return (
    <Card className="mt-4">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Bubble Sort Pseudo-code</h3>
        <pre className="text-sm bg-gray-100 p-4 rounded-md overflow-x-auto">
          {`function bubbleSort(arr):
    n = arr.length
    for i from 0 to n-1:
        for j from 0 to n-i-1:
            if arr[j] > arr[j+1]:
                swap arr[j] and arr[j+1]
    return arr`}
        </pre>
      </div>
    </Card>
  )
}

function Theory() {
  return (
    <Card className="mt-4">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Bubble Sort Theory</h3>
        <p className="mb-2">
          Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
        </p>
        <h4 className="font-semibold mt-2">How it works:</h4>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Start with the first element</li>
          <li>Compare it with the next element</li>
          <li>If it's greater, swap them</li>
          <li>Move to the next element and repeat steps 2-3 until the end of the list</li>
          <li>Repeat steps 1-4 for each pass through the list until no more swaps are needed</li>
        </ol>
        <h4 className="font-semibold mt-2">Characteristics:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Time Complexity: O(n²) - not efficient for large datasets</li>
          <li>Space Complexity: O(1) - only requires a constant amount of additional memory space</li>
          <li>Stable sorting algorithm</li>
          <li>Simple to implement and understand</li>
        </ul>
      </div>
    </Card>
  )
}

export default function BubbleSort() {
  const [array, setArray] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [stepDescriptions, setStepDescriptions] = useState([])
  const [isSorting, setIsSorting] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [showPseudoCode, setShowPseudoCode] = useState(false)
  const [showTheory, setShowTheory] = useState(false)
  const [customArrayInput, setCustomArrayInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    generateRandomArray()
  }, [])

  const generateRandomArray = () => {
    const newArray = Array.from({ length: DEFAULT_ARRAY_SIZE }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setCustomArrayInput(newArray.join(', '))
  }

  const handleCustomArrayInput = (input) => {
    setCustomArrayInput(input)
    try {
      const newArray = input.split(',').map(num => {
        const parsed = parseInt(num.trim(), 10)
        if (isNaN(parsed)) throw new Error('Invalid number')
        return parsed
      })
      if (newArray.length === 0) throw new Error('Array is empty')
      if (newArray.length > 20) throw new Error('Array size should not exceed 20 elements')
      setArray(newArray)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const bubbleSort = (arr) => {
    const steps = []
    const descriptions = []
    const n = arr.length
    let swapped

    for (let i = 0; i < n - 1; i++) {
      swapped = false
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({ comparing: [j, j + 1], swapping: false })
        descriptions.push(`Comparing elements at indices ${j} and ${j + 1}`)
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          swapped = true
          steps.push({ comparing: [j, j + 1], swapping: true })
          descriptions.push(`Swapping elements at indices ${j} and ${j + 1}`)
        }
      }
      if (!swapped) break
    }

    return [steps, descriptions]
  }

  const handleSort = () => {
    const [sortSteps, sortDescriptions] = bubbleSort([...array])
    setSteps(sortSteps)
    setStepDescriptions(sortDescriptions)
    setCurrentStep(0)
    setIsSorting(true)
    setIsSorted(false)
  }

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (steps[currentStep + 1].swapping) {
        const newArray = [...array]
        const [i, j] = steps[currentStep + 1].comparing
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
        setArray(newArray)
      }
      if (currentStep + 1 === steps.length - 1) {
        setIsSorted(true)
      }
    }
  }

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      if (steps[currentStep].swapping) {
        const newArray = [...array]
        const [i, j] = steps[currentStep].comparing
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
        setArray(newArray)
      }
    }
  }

  const handleReset = () => {
    setCurrentStep(-1)
    setIsSorting(false)
    setIsSorted(false)
    generateRandomArray()
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Bubble Sort Visualization</h2>
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
                  currentStep >= 0 &&
                  steps[currentStep].comparing.includes(index)
                    ? steps[currentStep].swapping
                      ? 'bg-green-200 border-green-500'
                      : 'bg-yellow-200 border-yellow-500'
                    : 'border-gray-300'
                }`}
                animate={{
                  scale: currentStep >= 0 && steps[currentStep].comparing.includes(index) ? 1.1 : 1,
                }}
                transition={{ duration: ANIMATION_DURATION }}
              >
                {num}
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
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Current Step:</h3>
            <p>{stepDescriptions[currentStep]}</p>
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
  )
}

