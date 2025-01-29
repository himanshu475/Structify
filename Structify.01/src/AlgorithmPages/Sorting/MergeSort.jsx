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

function MergeSort() {
  const [array, setArray] = useState([])
  const [divideSteps, setDivideSteps] = useState([])
  const [mergeSteps, setMergeSteps] = useState([])
  const [currentPhase, setCurrentPhase] = useState("initial")
  const [currentDivideStep, setCurrentDivideStep] = useState(0)
  const [currentMergeStep, setCurrentMergeStep] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showPseudocode, setShowPseudocode] = useState(false)
  const [customInput, setCustomInput] = useState("")
  const [inputError, setInputError] = useState("")

  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 1)
    setArray(newArray)
    setDivideSteps([])
    setMergeSteps([])
    setCurrentPhase("initial")
    setCurrentDivideStep(0)
    setCurrentMergeStep(0)
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
    setDivideSteps([])
    setMergeSteps([])
    setCurrentPhase("initial")
    setCurrentDivideStep(0)
    setCurrentMergeStep(0)
    setCustomInput("")
  }

  useEffect(() => {
    generateArray()
  }, [])

  const prepareMergeSort = () => {
    const divideSteps = []
    const mergeSteps = []
    const tempArray = [...array]

    const generateDivideSteps = (arr, level = 0, position = "root") => {
      if (arr.length <= 1) return arr

      const mid = Math.floor(arr.length / 2)
      const left = arr.slice(0, mid)
      const right = arr.slice(mid)

      divideSteps.push({
        original: arr,
        left,
        right,
        level,
        position,
      })

      generateDivideSteps(left, level + 1, "left")
      generateDivideSteps(right, level + 1, "right")

      return arr
    }

    const generateMergeSteps = (arr, level = 0) => {
      if (arr.length <= 1) return arr

      const mid = Math.floor(arr.length / 2)
      const left = generateMergeSteps(arr.slice(0, mid), level + 1)
      const right = generateMergeSteps(arr.slice(mid), level + 1)

      const merged = []
      let i = 0,
        j = 0

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          merged.push(left[i])
          i++
        } else {
          merged.push(right[j])
          j++
        }
      }

      while (i < left.length) merged.push(left[i++])
      while (j < right.length) merged.push(right[j++])

      mergeSteps.push({
        left,
        right,
        merged,
        level,
        comparing: { left: i, right: j },
      })

      return merged
    }

    generateDivideSteps(tempArray)
    generateMergeSteps(tempArray)

    setDivideSteps(divideSteps)
    setMergeSteps(mergeSteps)
    setCurrentPhase("divide")
  }

  const renderArrayBox = (arr, bgColor = "bg-white dark:bg-gray-700", showIndices = true) => (
    <div className="flex flex-col items-center">
      {showIndices && (
        <div className="flex flex-wrap justify-center gap-2 mb-1">
          {arr.map((_, idx) => (
            <div
              key={idx}
              className="w-8 sm:w-10 md:w-12 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400"
            >
              [{idx}]
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {arr.map((num, idx) => (
          <div
            key={idx}
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center ${bgColor} border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  )

  const renderDivideStep = () => {
    const step = divideSteps[currentDivideStep]
    if (!step) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Original Array:</h3>
          {renderArrayBox(step.original)}
        </div>
        <ArrowDown className="mx-auto text-blue-500" />
        <div className="flex justify-center gap-8">
          <div>
            <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Left Half:</h3>
            {renderArrayBox(step.left, "bg-yellow-200 dark:bg-yellow-700")}
          </div>
          <div>
            <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Right Half:</h3>
            {renderArrayBox(step.right, "bg-yellow-200 dark:bg-yellow-700")}
          </div>
        </div>
      </div>
    )
  }

  const renderMergeStep = () => {
    const step = mergeSteps[currentMergeStep]
    if (!step) return null

    return (
      <div className="space-y-4">
        <div className="flex justify-center gap-8">
          <div>
            <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Left Array:</h3>
            {renderArrayBox(step.left, "bg-yellow-200 dark:bg-yellow-700")}
          </div>
          <div>
            <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Right Array:</h3>
            {renderArrayBox(step.right, "bg-yellow-200 dark:bg-yellow-700")}
          </div>
        </div>
        <ArrowDown className="mx-auto text-blue-500" />
        <div>
          <h3 className="font-semibold text-center mb-2 text-gray-900 dark:text-white">Merged Result:</h3>
          <div className="flex justify-center">{renderArrayBox(step.merged, "bg-green-200 dark:bg-green-700")}</div>
        </div>
      </div>
    )
  }

  const nextStep = () => {
    if (currentPhase === "divide") {
      if (currentDivideStep < divideSteps.length - 1) {
        setCurrentDivideStep((prev) => prev + 1)
      } else {
        setCurrentPhase("merge")
      }
    } else if (currentPhase === "merge") {
      if (currentMergeStep < mergeSteps.length - 1) {
        setCurrentMergeStep((prev) => prev + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentPhase === "merge") {
      if (currentMergeStep > 0) {
        setCurrentMergeStep((prev) => prev - 1)
      } else {
        setCurrentPhase("divide")
        setCurrentMergeStep(0)
      }
    } else if (currentPhase === "divide") {
      if (currentDivideStep > 0) {
        setCurrentDivideStep((prev) => prev - 1)
      }
    }
  }

  const renderExplanation = () => (
    <Card id="whyMergeSort" className="p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Merge Sort?</h3>
      <div className="space-y-4 text-gray-800 dark:text-gray-200">
        <div>
          <h4 className="font-semibold">1. Efficiency</h4>
          <p>
            Merge sort has a time complexity of O(n log n) for all cases, making it more efficient than simpler
            algorithms like bubble sort or insertion sort for large datasets.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">2. Stability</h4>
          <p>
            It's a stable sorting algorithm, meaning it preserves the relative order of equal elements in the sorted
            output.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">3. Predictable Performance</h4>
          <p>Unlike quicksort, merge sort's performance is consistent regardless of the input data's initial order.</p>
        </div>
        <div>
          <h4 className="font-semibold">4. Parallelization</h4>
          <p>The divide-and-conquer approach makes it suitable for parallel processing implementations.</p>
        </div>
        <div>
          <h4 className="font-semibold">5. Time Complexity</h4>
          <p>
            - Best Case: O(n log n)
            <br />- Average Case: O(n log n)
            <br />- Worst Case: O(n log n)
          </p>
          <p className="mt-2">
            Merge Sort consistently performs at O(n log n) for all cases because it always divides the array into two
            halves and takes linear time to merge two halves.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">6. Space Complexity</h4>
          <p>O(n)</p>
          <p className="mt-2">
            Merge Sort requires additional space proportional to the size of the input array. This is because it needs
            to create temporary arrays during the merging process.
          </p>
        </div>
      </div>
    </Card>
  )

  const renderPseudocode = () => (
    <Card id="mergeSortPseudocode" className="p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Merge Sort Pseudocode</h3>
      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-gray-900 dark:text-white">
        {`// Main merge sort function
mergeSort(array):
    if length of array ≤ 1
        return array
    
    mid = length of array / 2
    left = array[0...mid]
    right = array[mid...end]
    
    // Recursively sort both halves
    left = mergeSort(left)
    right = mergeSort(right)
    
    // Merge the sorted halves
    return merge(left, right)

// Merge function
merge(left, right):
    result = empty array
    leftIndex = 0
    rightIndex = 0
    
    while leftIndex < length of left AND rightIndex < length of right
        if left[leftIndex] ≤ right[rightIndex]
            append left[leftIndex] to result
            leftIndex = leftIndex + 1
        else
            append right[rightIndex] to result
            rightIndex = rightIndex + 1
    
    // Append remaining elements
    append remaining elements of left to result
    append remaining elements of right to result
    
    return result`}
      </pre>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
              Merge Sort Visualization
            </h1>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setShowExplanation(!showExplanation)
                  if (!showExplanation) {
                    setTimeout(() => {
                      document.getElementById("whyMergeSort")?.scrollIntoView({ behavior: "smooth" })
                    }, 100)
                  }
                }}
                className="text-sm"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Why Merge Sort?
              </Button>
              <Button
                onClick={() => {
                  setShowPseudocode(!showPseudocode)
                  if (!showPseudocode) {
                    setTimeout(() => {
                      document.getElementById("mergeSortPseudocode")?.scrollIntoView({ behavior: "smooth" })
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

          {currentPhase !== "initial" && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {currentPhase === "divide" ? "Division Phase" : "Merge Phase"} - Step{" "}
                {currentPhase === "divide" ? currentDivideStep + 1 : currentMergeStep + 1}
              </h2>

              {currentPhase === "divide" ? renderDivideStep() : renderMergeStep()}

              <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentPhase === "divide"
                    ? "Dividing the array into smaller subarrays until we reach individual elements"
                    : "Merging sorted subarrays back together in sorted order"}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Button onClick={generateArray}>
              <RotateCcw className="w-5 h-5 mr-2" />
              New Array
            </Button>

            {currentPhase === "initial" && <Button onClick={prepareMergeSort}>Start Merge Sort</Button>}

            {currentPhase !== "initial" && (
              <>
                <Button onClick={prevStep} disabled={currentPhase === "divide" && currentDivideStep === 0}>
                  Previous Step
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={currentPhase === "merge" && currentMergeStep === mergeSteps.length - 1}
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
              <span className="text-gray-900 dark:text-white">Original Array</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-200 dark:bg-yellow-700 border border-gray-300 dark:border-gray-600 rounded mr-2"></div>
              <div className="text-gray-900 dark:text-white">
                <span>Division Phase: Subarrays</span>
                <br />
                <span>Merge Phase: Arrays being compared</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-200 dark:bg-green-700 border border-gray-300 dark:border-gray-600 rounded mr-2"></div>
              <span className="text-gray-900 dark:text-white">Merged Result</span>
            </div>
          </div>
        </Card>

        {showExplanation && renderExplanation()}
        {showPseudocode && renderPseudocode()}
      </div>
    </div>
  )
}

export default MergeSort;

