import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const PROBLEMS = [
  {
    id: 'graph-connectivity',
    title: 'Graph Connectivity Check',
    description: 'Complete the code to determine if an undirected graph is connected using BFS.',
    codeLines: [
      'def is_connected(graph):',
      '    if not graph:',
      '        return False',
      '',
      '    first = list(graph.keys())[0]',
      '    to_visit = [first]',
      '    seen = {first}',
      '',
      '    while _____1_____:',
      '        curr = _____2_____',
      '        for neighbor in graph[curr]:',
      '            if _____3_____:',
      '                seen.add(neighbor)',
      '                _____4_____',
      '',
      '    return len(seen) == _____5_____'
    ],
    tokens: [
      'to_visit.pop()',
      'seen.remove',
      'to_visit',
      'len(seen)',
      'to_visit.append(neighbor)',
      'neighbor in seen',
      'neighbor not in seen',
      'len(graph)'
    ],
    solutions: {
      '1': 'to_visit',
      '2': 'to_visit.pop()',
      '3': 'neighbor not in seen',
      '4': 'to_visit.append(neighbor)',
      '5': 'len(graph)'
    },
    hints: {
      '1': 'We need to continue while there are nodes to visit',
      '2': 'We should remove and return the next node to process',
      '3': 'We only want to process nodes we haven\'t seen before',
      '4': 'Add the new neighbor to our queue of nodes to visit',
      '5': 'The graph is connected if we\'ve seen all nodes'
    }
  },
  {
    id: 'binary-search',
    title: 'Binary Search Implementation',
    description: 'Complete the code for a binary search algorithm.',
    codeLines: [
      'function binarySearch(arr, target) {',
      '  let left = 0;',
      '  let right = _____1_____;',
      '',
      '  while (_____2_____) {',
      '    const mid = _____3_____;',
      '    if (arr[mid] === target) {',
      '      return mid;',
      '    } else if (_____4_____) {',
      '      left = mid + 1;',
      '    } else {',
      '      right = _____5_____;',
      '    }',
      '  }',
      '  return -1;',
      '}'
    ],
    tokens: [
      'arr.length - 1',
      'left <= right',
      'Math.floor((left + right) / 2)',
      'arr[mid] < target',
      'mid - 1',
      'left >= right',
      'Math.ceil((left + right) / 2)'
    ],
    solutions: {
      '1': 'arr.length - 1',
      '2': 'left <= right',
      '3': 'Math.floor((left + right) / 2)',
      '4': 'arr[mid] < target',
      '5': 'mid - 1'
    },
    hints: {
      '1': 'We need to continue while there are nodes to visit',
      '2': 'We should remove and return the next node to process',
      '3': 'We only want to process nodes we haven\'t seen before',
      '4': 'Add the new neighbor to our queue of nodes to visit',
      '5': 'The graph is connected if we\'ve seen all nodes'
    }
  },
  {
    id: 'sliding-window-min-sum',
    title: 'Smallest array for a given sum ',
    description: 'Given an array of positive integers and a number S, find the length of the smallest contiguous subarray whose sum is greater than or equal to S. Return 0 if no such subarray exists.',
    codeLines: [
      'def findMinSubArray(self, s, arr):',
      ' window_sum = 0',
      ' min_length = math.inf',
      ' window_start = 0',
      '',
      'for window_end in range(0, len(arr)):',
      '    window_sum += _____1_____',
      '    while _____2_____:',
      '        min_length = min(min_length, _____3_____)',
      '        window_sum -= _____4_____',
      '        _____5_____',
      '',
      'if min_length == math.inf:',
      '    return 0',
      'return min_length'
    ],
    tokens: [
      'window_sum >= s',
      'arr[window_end]',
      'window_sum <= s',
      'window_end - window_start + 1',
      'window_end - window_start',
      'arr[window_start]',
      'window_start += 1',
      'window_end -= 1'
    ],
    solutions: {
      '1': 'arr[window_end]',
      '2': 'window_sum >= s',
      '3': 'window_end - window_start + 1',
      '4': 'arr[window_start]',
      '5': 'window_start += 1'
    },
    hints: {
      '1': 'We need to continue while there are nodes to visit',
      '2': 'We should remove and return the next node to process',
      '3': 'We only want to process nodes we haven\'t seen before',
      '4': 'Add the new neighbor to our queue of nodes to visit',
      '5': 'The graph is connected if we\'ve seen all nodes'
    }
  }
];

const CodePractice = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [draggedToken, setDraggedToken] = useState<string | null>(null);
  const [filledAnswers, setFilledAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [completedProblems, setCompletedProblems] = useState(new Set());
  const [showHint, setShowHint] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isDragging, setIsDragging] = useState(false);



  const currentProblem = PROBLEMS[currentProblemIndex];

  const handleDragStart = (token: string) => {
    setDraggedToken(token);
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (index: string) => {
    if (draggedToken) {
      setFilledAnswers(prev => ({
        ...prev,
        [index]: draggedToken
      }));
      setDraggedToken(null);
    }
  };

  const clearAnswers = () => {
    setFilledAnswers({});
    setShowResults(false);
    setShowHint(null);
    setShowSuccessAnimation(false);
  };

  const navigateNext = () => {
    const newIndex = currentProblemIndex + 1;
    if (newIndex < PROBLEMS.length) {
      setCurrentProblemIndex(newIndex);
      setFilledAnswers({});
      setShowResults(false);
      setShowHint(null);
    }
  };

  const navigateProblem = (direction : number) => {
    const newIndex = currentProblemIndex + direction;
    if (newIndex >= 0 && newIndex < PROBLEMS.length) {
      setCurrentProblemIndex(newIndex);
      setFilledAnswers({});
      setShowResults(false);
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
    const allCorrect = Object.entries(currentProblem.solutions).every(
      ([index, solution]) => filledAnswers[index] === solution
    );
    
    if (allCorrect) {
      setShowSuccessAnimation(true);
      setCompletedProblems(prev => new Set([...prev, currentProblem.id]));
      setTimeout(() => {
        setShowSuccessAnimation(false);
        if (currentProblemIndex < PROBLEMS.length - 1) {
          setTimeout(navigateNext, 500);
        }
      }, 1500);
    }
  };

  const isAnswerCorrect = (index: string) => {
    return filledAnswers[index] === currentProblem.solutions[index as keyof typeof currentProblem.solutions];
  };

  const allAnswersFilled = () => {
    return Object.keys(currentProblem.solutions).every(index => filledAnswers[index]);
  };

  const getSlotClassName = (index : string) => {
    const baseClass = "mx-1 px-2 py-1 rounded cursor-pointer transition-all duration-300";
    if (showSuccessAnimation && isAnswerCorrect(index)) {
      return `${baseClass} animate-bounce bg-green-100 scale-110`;
    }
    if (!showResults) {
      return `${baseClass} ${isDragging ? 'bg-blue-200 ring-2 ring-blue-400 scale-105' : 'bg-blue-100'} 
        hover:bg-blue-200 hover:scale-105 transform transition-all`;
    }
    return `${baseClass} ${
      filledAnswers[index] 
      ? (isAnswerCorrect(index) 
        ? "bg-green-100 scale-105 animate-pulse" 
        : "bg-red-100 shake animate-shake")
      : "bg-blue-100"
    }`;
  };

  const getTokenClassName = (token : string) => {
    const isUsed = Object.values(filledAnswers).includes(token);
    return `${
      isUsed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-md cursor-grab active:cursor-grabbing'
    } bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm transform transition-all duration-200`;
  };

  const handleHintClick = (index: string) => {
    setShowHint(showHint === index ? null : index);
  };

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-900">
      <div className="mb-8 space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {currentProblem.title}
        </h2>
        <p className="text-lg text-gray-700 font-sans leading-relaxed">
          {currentProblem.description}
        </p>
      </div>

      <div className="flex gap-8">
        <div className="w-3/4 relative">
        <pre className="bg-gray-100 p-6 rounded-lg text-sm font-mono text-left overflow-x-auto shadow-inner">
            {currentProblem.codeLines.map((line, index) => {
              const matches = line.match(/_____\d+_____/g);
              if (!matches) return <div key={index} className="leading-relaxed">{line}</div>;
              
              let parts = line.split(/_____\d+_____/);
              return (
                <div key={index} className="relative group leading-relaxed">
                  {parts.map((part, pIndex) => (
                    <React.Fragment key={pIndex}>
                      {part}
                      {pIndex < parts.length - 1 && (
                        <span className="relative inline-flex items-center">
                          <span
                            className={getSlotClassName(matches[pIndex].match(/\d+/)![0])}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(matches[pIndex].match(/\d+/)![0])}
                          >
                            {filledAnswers[matches[pIndex].match(/\d+/)![0]] || '_____'}
                          </span>
                          <button
                            onClick={() => handleHintClick(matches[pIndex].match(/\d+/)![0])}
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-800"
                          >
                            💡
                          </button>
                          {showHint === matches[pIndex].match(/\d+/)![0] && (
                            <div className="absolute left-0 transform -translate-y-full bg-yellow-100 p-3 rounded-lg text-sm shadow-xl z-50 whitespace-normal w-72 break-words animate-fadeIn">
                              {currentProblem.hints[matches[pIndex].match(/\d+/)![0] as keyof typeof currentProblem.hints]}
                            </div>
                          )}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              );
            })}
          </pre>
          {currentProblemIndex < PROBLEMS.length - 1 && (
            <button
              onClick={navigateNext}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg 
                text-sm font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 
                transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next Question <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="w-1/4 space-y-6">
          <div className="space-y-2">
            {currentProblem.tokens.map((token, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(token)}
                onDragEnd={handleDragEnd}
                className={getTokenClassName(token)}
              >
                {token}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <button
              onClick={checkAnswers}
              disabled={!allAnswersFilled()}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 
                text-white px-6 py-3 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed
                transform transition-all hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 
                focus:ring-green-500 focus:ring-offset-2"
            >
              Check Answers
            </button>
            <button
              onClick={clearAnswers}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium
                transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 
                focus:ring-offset-2"
            >
              Clear Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePractice;
