"use client"

import { useState } from "react"
import { TreesIcon, ArrowDown, ArrowUp, Layers, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

function Button({ onClick, disabled, children, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-black text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center dark:bg-gray-600 dark:text-white ${className}`}
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
      className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
    />
  )
}

function Card({ children, className }) {
  return <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg ${className}`}>{children}</div>
}

export default function Recursion() {
  const [number, setNumber] = useState(5)
  const [step, setStep] = useState(0)

  const maxSteps = number * 2

  const calculateFactorial = (n) => {
    if (n <= 1) return 1
    return n * calculateFactorial(n - 1)
  }

  const getStackFrames = () => {
    const frames = []
    if (step < number) {
      for (let i = 0; i <= step; i++) {
        frames.push({
          n: number - i,
          isActive: i === step,
          isReturning: false,
          result: null,
        })
      }
    } else {
      const returningStep = step - number
      for (let i = 0; i < number - returningStep; i++) {
        const currentN = number - i
        frames.push({
          n: currentN,
          isActive: i === number - returningStep - 1,
          isReturning: true,
          result: calculateFactorial(currentN),
        })
      }
    }
    return frames
  }

  const getStepExplanation = () => {
    if (step < number) {
      return `Step ${step + 1}: Calling factorial(${number - step})
        \nThe function is going down the stack, breaking the problem into smaller subproblems.
        \nWaiting for factorial(${number - step - 1}) to resolve before we can calculate the result.`
    } else {
      const returningStep = step - number
      const currentN = number - returningStep
      return `Step ${step + 1}: Returning from factorial(${currentN})
        \nThe base case has been reached, now we're calculating results back up the stack.
        \nResult: ${calculateFactorial(currentN)}`
    }
  }

  const StackFrame = ({ frame }) => {
    const getBgColor = () => {
      if (frame.isActive && !frame.isReturning) return "bg-yellow-200 dark:bg-yellow-700"
      if (frame.isReturning) return "bg-green-200 dark:bg-green-700"
      return "bg-gray-50 dark:bg-gray-700"
    }

    const getBorderColor = () => {
      if (frame.isActive && !frame.isReturning) return "border-yellow-500 dark:border-yellow-400"
      if (frame.isReturning) return "border-green-500 dark:border-green-400"
      return "border-gray-300 dark:border-gray-600"
    }

    return (
      <div className={`p-4 border-2 ${getBorderColor()} ${getBgColor()} rounded-lg mb-2 transition-all duration-300`}>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-mono text-lg text-gray-900 dark:text-white">factorial({frame.n})</span>
            {frame.isReturning && (
              <span className="ml-4 text-green-600 dark:text-green-400 font-mono">→ {frame.result}</span>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{frame.isActive ? "← Current Frame" : ""}</div>
        </div>
        {frame.isActive && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {frame.n <= 1 ? "Base case reached!" : `Waiting for factorial(${frame.n - 1})`}
          </div>
        )}
      </div>
    )
  }

  const Node = ({ value, level }) => {
    if (value <= 0) return null

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-full ${step >= number - value ? "bg-green-200 dark:bg-green-700 border-green-500 dark:border-green-400" : "bg-purple-200 dark:bg-purple-700 border-purple-500 dark:border-purple-400"} border-2 flex items-center justify-center text-gray-700 dark:text-gray-200 font-semibold`}
          >
            {value}
          </div>
          {value > 1 && (
            <div className="absolute w-[2px] h-6 bg-gray-300 dark:bg-gray-600 left-1/2 -translate-x-1/2 -bottom-6" />
          )}
        </div>
        {value > 1 && (
          <div className="mt-6 flex gap-12">
            <Node value={value - 1} level={level + 1} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Understanding Recursion
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <TreesIcon className="w-6 h-6 text-green-600" />
              What is Recursion?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Recursion is a programming concept where a function calls itself to solve a larger problem by breaking it
              down into smaller, similar sub-problems. Each recursive call works on a smaller instance of the same
              problem until a base case is reached.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <Layers className="w-6 h-6 text-blue-600" />
              Factorial Example Code
            </h2>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-100">
                {`function factorial(n) {
  // Base case
  if (n <= 1) {
    return 1;
  }
  
  // Recursive case
  return n * factorial(n - 1);
}`}
              </pre>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <ArrowDown className="w-6 h-6 text-purple-600" />
              Recursion Tree
            </h2>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter a number (1-7):
                </label>
                <Input
                  type="number"
                  min="1"
                  max="7"
                  value={number}
                  onChange={(e) => {
                    const value = Math.min(7, Math.max(1, Number.parseInt(e.target.value) || 1))
                    setNumber(value)
                    setStep(0)
                  }}
                  className="w-20"
                />
              </div>
              <div className="overflow-auto p-4">
                <Node value={number} level={0} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <ArrowUp className="w-6 h-6 text-orange-600" />
              Stack Space Visualization
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-sm">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={() => setStep(0)} className="text-sm">
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button
                  onClick={() => setStep(Math.min(maxSteps - 1, step + 1))}
                  disabled={step === maxSteps - 1}
                  className="text-sm"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                  {getStepExplanation()}
                </pre>
              </div>

              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Call Stack</h3>
                <div className="space-y-2">
                  {getStackFrames().map((frame, index) => (
                    <StackFrame key={index} frame={frame} />
                  ))}
                </div>
              </div>

              {step === maxSteps - 1 && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
                  <p className="text-green-700 dark:text-green-200 font-semibold">
                    Final Result: factorial({number}) = {calculateFactorial(number)}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

