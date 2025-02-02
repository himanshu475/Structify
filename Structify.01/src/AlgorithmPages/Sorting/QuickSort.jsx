import React, { useState, useEffect } from "react"
import { ChevronRight, RotateCcw, ArrowDown, BookOpen, Code } from "lucide-react"

function Button({ onClick, disabled, children, className = "" }) {
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

function Card({ children, className = "", id }) {
  return (
    <div id={id} className={`bg-white dark:bg-gray-800 shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  )
}

function QuickSort() {
  const [array, setArray] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showPseudocode, setShowPseudocode] = useState(false)
  const [customInput, setCustomInput] = useState("")
  const [inputError, setInputError] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 1)
    setArray(newArray)
    setSteps([])
    setCurrentStep(0)
    setIsRunning(false)
    setCustomInput("")
    setInputError("")
  }

  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value)
    setInputError("")
  }

  const handleCustomArraySubmit = () => {
    const inputArray = customInput.split(",").map((num) => Number.parseInt(num.trim(), 10))
    if (inputArray.some(isNaN)) {
      setInputError("Please enter valid numbers separated by commas.")
      return
    }
    if (inputArray.length < 2 || inputArray.length > 16) {
      setInputError("Please enter between 2 and 16 numbers.")
      return
    }
    setArray(inputArray)
    setSteps([])
    setCurrentStep(0)
    setIsRunning(false)
    setCustomInput("")
  }

  useEffect(() => {
    generateArray()
  }, [])

  const prepareQuickSort = () => {
    const steps = []
    const tempArray = [...array]

    const partition = (arr, low, high, level = 0) => {
      const pivot = arr[low] // Changed to use first element as pivot
      let i = low + 1 // Start from element next to pivot
      let j = high

      steps.push({
        array: [...arr],
        pivot: low, // Changed pivot index
        i,
        j,
        low,
        high,
        level,
        swapIndices: [],
        type: 'partition-start'
      })

      while (i <= j) {
        // Find element greater than pivot from left
        while (i <= high && arr[i] <= pivot) {
          steps.push({
            array: [...arr],
            pivot: low,
            comparing: i,
            i,
            j,
            low,
            high,
            level,
            type: 'comparing-left'
          })
          i++
        }

        // Find element smaller than pivot from right
        while (j > low && arr[j] > pivot) {
          steps.push({
            array: [...arr],
            pivot: low,
            comparing: j,
            i,
            j,
            low,
            high,
            level,
            type: 'comparing-right'
          })
          j--
        }

        // Swap if i and j haven't crossed
        if (i < j) {
          [arr[i], arr[j]] = [arr[j], arr[i]]
          steps.push({
            array: [...arr],
            pivot: low,
            swapIndices: [i, j],
            i,
            j,
            low,
            high,
            level,
            type: 'swap'
          })
        }
      }

      // Place pivot in correct position
      [arr[low], arr[j]] = [arr[j], arr[low]]
      steps.push({
        array: [...arr],
        pivot: j,
        swapIndices: [low, j],
        i,
        j,
        low,
        high,
        level,
        type: 'pivot-placement'
      })

      // Show partitioned subarrays
      if (j - 1 - low > 0) {
        steps.push({
          array: [...arr],
          pivot: j,
          partitionRange: { start: low, end: j - 1 },
          level: level + 1,
          type: 'show-left-partition'
        })
      }
      
      if (high - (j + 1) > 0) {
        steps.push({
          array: [...arr],
          pivot: j,
          partitionRange: { start: j + 1, end: high },
          level: level + 1,
          type: 'show-right-partition'
        })
      }

      return j
    }

    const quickSort = (arr, low, high, level = 0) => {
      if (low < high) {
        const pi = partition(arr, low, high, level)
        quickSort(arr, low, pi - 1, level + 1)
        quickSort(arr, pi + 1, high, level + 1)
      }
    }

    quickSort(tempArray, 0, tempArray.length - 1)
    setSteps(steps)
    setCurrentStep(0)
    setIsRunning(true)
  }

  const renderArrayBox = (arr, highlights = {}) => (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2 mb-1">
        {arr.map((_, idx) => (
          <div
            key={idx}
            className={`w-8 sm:w-10 md:w-12 text-center text-xs sm:text-sm 
              ${highlights.i === idx ? 'text-blue-600 dark:text-blue-400 font-bold' : 
                highlights.j === idx ? 'text-yellow-600 dark:text-yellow-400 font-bold' : 
                'text-gray-600 dark:text-gray-400'}`}
          >
            [{idx}]
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {arr.map((num, idx) => {
          let bgColor = "bg-white dark:bg-gray-700"
          if (highlights.pivot === idx) {
            bgColor = "bg-red-200 dark:bg-red-700"
          } else if (highlights.comparing === idx) {
            bgColor = "bg-yellow-200 dark:bg-yellow-700"
          } else if (highlights.swapIndices?.includes(idx)) {
            bgColor = "bg-blue-200 dark:bg-blue-700"
          } else if (highlights.partitionRange && 
                    idx >= highlights.partitionRange.start && 
                    idx <= highlights.partitionRange.end) {
            bgColor = "bg-purple-200 dark:bg-purple-700"
          }
          
          return (
            <div
              key={idx}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center ${bgColor} border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base`}
            >
              {num}
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderStep = () => {
    const step = steps[currentStep]
    if (!step) return null

    let description = ""
    let indices = ""
    let partitionInfo = ""

    switch (step.type) {
      case 'partition-start':
        description = `Starting partition with pivot element ${step.array[step.pivot]} (first element)`
        indices = `Pivot Index: ${step.pivot}, i: ${step.i}, j: ${step.j}`
        partitionInfo = `Level: ${step.level}`
        break
      case 'comparing-left':
        description = `Looking for element greater than pivot ${step.array[step.pivot]} from left`
        indices = `Pivot Index: ${step.pivot}, i: ${step.i}, j: ${step.j}`
        partitionInfo = `Level: ${step.level}`
        break
      case 'comparing-right':
        description = `Looking for element smaller than pivot ${step.array[step.pivot]} from right`
        indices = `Pivot Index: ${step.pivot}, i: ${step.i}, j: ${step.j}`
        partitionInfo = `Level: ${step.level}`
        break
      case 'swap':
        description = `Swapping elements ${step.array[step.swapIndices[0]]} and ${step.array[step.swapIndices[1]]}`
        indices = `Pivot Index: ${step.pivot}, i: ${step.i}, j: ${step.j}`
        partitionInfo = `Level: ${step.level}`
        break
      case 'pivot-placement':
        description = `Placing pivot ${step.array[step.pivot]} in its correct position`
        indices = `Final Pivot Position: ${step.pivot}`
        partitionInfo = `Level: ${step.level}`
        break
      case 'show-left-partition':
        description = `Left partition to be sorted`
        partitionInfo = `Level: ${step.level}, Range: [${step.partitionRange.start}, ${step.partitionRange.end}]`
        break
      case 'show-right-partition':
        description = `Right partition to be sorted`
        partitionInfo = `Level: ${step.level}, Range: [${step.partitionRange.start}, ${step.partitionRange.end}]`
        break
      default:
        description = "Processing array"
    }

    return (
      <div className="space-y-4">
        <div>
          {renderArrayBox(step.array, {
            pivot: step.pivot,
            comparing: step.comparing,
            swapIndices: step.swapIndices,
            partitionRange: step.partitionRange,
            i: step.i,
            j: step.j
          })}
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
          {indices && (
            <p className="text-sm font-mono bg-gray-100 dark:bg-gray-600 p-2 rounded">
              {indices}
            </p>
          )}
          {partitionInfo && (
            <p className="text-sm font-mono bg-gray-100 dark:bg-gray-600 p-2 rounded">
              {partitionInfo}
            </p>
          )}
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">i</span> and{" "}
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">j</span> indices are highlighted above the array
          </div>
        </div>
      </div>
    )
  }

  const renderExplanation = () => (
    <Card id="whyQuickSort" className="p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Quick Sort?</h3>
      <div className="space-y-4 text-gray-800 dark:text-gray-200">
        <div>
          <h4 className="font-semibold">1. Efficiency</h4>
          <p>
            QuickSort has an average time complexity of O(n log n), making it one of the fastest sorting algorithms in practice.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">2. In-Place Sorting</h4>
          <p>
            Unlike Merge Sort, QuickSort is an in-place sorting algorithm, requiring only O(log n) additional space.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">3. Cache Efficiency</h4>
          <p>QuickSort is cache-friendly as it works with contiguous blocks of memory.</p>
        </div>
        <div>
          <h4 className="font-semibold">4. Time Complexity</h4>
          <p>
            - Best Case: O(n log n)
            <br />- Average Case: O(n log n)
            <br />- Worst Case: O(n²)
          </p>
        </div>
        <div>
          <h4 className="font-semibold">5. Space Complexity</h4>
          <p>O(log n)</p>
          <p className="mt-2">
            QuickSort requires less additional space compared to Merge Sort, making it more memory efficient.
          </p>
        </div>
      </div>
    </Card>
  )

  const renderPseudocode = () => (
    <Card id="quickSortPseudocode" className="p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Sort Pseudocode</h3>
      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-gray-900 dark:text-white">
        {`// Main quicksort function
quickSort(array, low, high):
    if low < high:
        // pi is partitioning index
        pi = partition(array, low, high)
        
        // Separately sort elements before and after partition
        quickSort(array, low, pi - 1)
        quickSort(array, pi + 1, high)

// Partition function
partition(array, low, high):
    pivot = array[high]    // Choose rightmost element as pivot
    i = low - 1           // Index of smaller element
    
    for j = low to high - 1:
        // If current element is smaller than or equal to pivot
        if array[j] <= pivot:
            i = i + 1     // Increment index of smaller element
            swap array[i] with array[j]
    
    swap array[i + 1] with array[high]  // Place pivot in correct position
    return i + 1          // Return pivot's final position`}
      </pre>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
              Quick Sort Visualization
            </h1>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setShowExplanation(!showExplanation)
                  if (!showExplanation) {
                    setTimeout(() => {
                      document.getElementById("whyQuickSort")?.scrollIntoView({ behavior: "smooth" })
                    }, 100)
                  }
                }}
                className="text-sm"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Why Quick Sort?
              </Button>
              <Button
                onClick={() => {
                  setShowPseudocode(!showPseudocode)
                  if (!showPseudocode) {
                    setTimeout(() => {
                      document.getElementById("quickSortPseudocode")?.scrollIntoView({ behavior: "smooth" })
                    }, 100)
                  }
                }}
                className="text-sm"
              >
                <Code className="w-5 h-5 mr-2" />
                Show Pseudocode
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Custom Array Input:</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                value={customInput}
                onChange={handleCustomInputChange}
                placeholder="Enter numbers separated by commas"
                className="w-full sm:w-auto flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Button onClick={handleCustomArraySubmit}>Set Custom Array</Button>
            </div>
            {inputError && <p className="text-red-500 mt-2">{inputError}</p>}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Current Array:</h2>
            {renderArrayBox(array)}
          </div>

          {isRunning && steps.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Step {currentStep + 1} of {steps.length}
              </h2>
              {renderStep()}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Button onClick={generateArray}>
              <RotateCcw className="w-5 h-5 mr-2" />
              New Array
            </Button>

            {!isRunning && <Button onClick={prepareQuickSort}>Start Quick Sort</Button>}

            {isRunning && (
              <>
                <Button onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} disabled={currentStep === 0}>
                  Previous Step
                </Button>
                <Button
                  onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                  disabled={currentStep === steps.length - 1}
                >
                  Next Step <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        </Card>

        <Card className="p-4 sm:p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Color Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded mr-2"></div>
              <span className="text-gray-900 dark:text-white">Unsorted Elements</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-200 dark:bg-red-700 border border-gray-300 dark:border-gray-600 rounded mr-2"></div>
              <span className="text-gray-900 dark:text-white">Pivot Element</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-200 dark:bg-yellow-700 border border-gray-300 dark:border-gray-600 rounded mr-2"></div>
              <span className="text-gray-900 dark:text-white">Element Being Compared</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 dark:bg-blue-700 border border-gray-300 dark:border-gray-600 rounded mr-2"></div>
              <span className="text-gray-900 dark:text-white">Elements Being Swapped</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-purple-200 dark:bg-purple-700 border border-gray-300 dark:border-gray-600 rounded mr-2"></div>
              <span className="text-gray-900 dark:text-white">Current Partition Range</span>
            </div>
          </div>
        </Card>

        {showExplanation && renderExplanation()}
        {showPseudocode && renderPseudocode()}
      </div>
    </div>
  )
}

export default QuickSort;