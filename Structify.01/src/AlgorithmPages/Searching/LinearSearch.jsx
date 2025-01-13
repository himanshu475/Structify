// import './tailwind.css';
import { useState, useEffect } from 'react';

function LinearSearch() {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState('');
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [found, setFound] = useState(false);
    const [searching, setSearching] = useState(false);
    const [result, setResult] = useState('');
    const [showPseudoCode, setShowPseudoCode] = useState(false);

    useEffect(() => {
        generateArray();
    }, []);

    const generateArray = () => {
        const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        setArray(newArray);
        setCurrentIndex(-1);
        setFound(false);
        setResult('');
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const startSearch = async () => {
        if (!target || searching) return;

        setSearching(true);
        setFound(false);
        setResult('');

        for (let i = 0; i < array.length; i++) {
            setCurrentIndex(i);
            await sleep(500);

            if (array[i] === parseInt(target)) {
                setFound(true);
                setResult(`Found ${target} at index ${i}`);
                setSearching(false);
                return;
            }
        }

        setResult(`${target} not found in the array`);
        setSearching(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4"> {/* Updated for dark mode */}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"> {/* Updated for dark mode */}
                    Linear Search Visualization
                </h1>

                <div className="mb-8 flex gap-4 justify-center">
                    <input
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="Enter number to search"
                        className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white" /* Updated for dark mode */
                    />
                    <button
                        onClick={startSearch}
                        disabled={searching || !target}
                        className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                        Search
                    </button>
                    <button
                        onClick={generateArray}
                        className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Generate New Array
                    </button>
                    <button
                        onClick={() => setShowPseudoCode(!showPseudoCode)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                    >
                        {showPseudoCode ? 'Hide' : 'Show'} Pseudo Code
                    </button>
                </div>

                <div className="flex justify-center gap-2 mb-6">
                    {array.map((num, index) => (
                        <div
                            key={index}
                            className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-lg
                ${currentIndex === index ? 'bg-yellow-500 transform scale-110' : 'bg-gray-600'}
                ${found && currentIndex === index ? 'bg-green-500' : ''}
                transition-all duration-200`}
                        >
                            <span className="text-gray-900 dark:text-white">{num}</span> {/* Updated for dark mode */}
                        </div>
                    ))}
                </div>

                {result && (
                    <div className={`text-center text-lg font-semibold ${found ? 'text-green-600' : 'text-red-600'}`}>
                        {result}
                    </div>
                )}

                {showPseudoCode && (
                    <div className="mt-6 bg-gray-800 text-white p-6 rounded-lg font-mono text-sm">
                        <pre className="whitespace-pre-wrap">
                            {`Algorithm: Linear Search
Input: array, target
Output: index of target or -1 if not found

1. FOR i = 0 to array.length - 1
2.    IF array[i] equals target THEN
3.       RETURN i
4.    END IF
5. END FOR
6. RETURN -1`}
                        </pre>
                    </div>
                )}

                <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"> {/* Updated for dark mode */}
                    <h2 className="text-xl font-bold mb-4 dark:text-white">How it works:</h2> {/* Updated for dark mode */}
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"> {/* Updated for dark mode */}
                        <li>Linear search checks each element one by one</li>
                        <li>Yellow highlight shows the current element being checked</li>
                        <li>Green highlight shows when the target is found</li>
                        <li>The search stops when the target is found or the array is fully traversed</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LinearSearch;
