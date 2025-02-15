import React, { useState } from 'react';

const CodePractice = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [draggedToken, setDraggedToken] = useState<string | null>(null);
  const [filledAnswers, setFilledAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [completedProblems, setCompletedProblems] = useState(new Set());
  const [showHint, setShowHint] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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

  const currentProblem = PROBLEMS[currentProblemIndex];

  const handleDragStart = (token: string) => {
    setDraggedToken(token);
    if (showResults) {
      setShowResults(false);
    }
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
      setTimeout(() => setShowSuccessAnimation(false), 1500);
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
      return `${baseClass} animate-bounce bg-green-100`;
    }
    if (!showResults) return `${baseClass} bg-blue-100 hover:bg-blue-200`;
    return `${baseClass} ${
      filledAnswers[index] 
        ? (isAnswerCorrect(index) ? "bg-green-100" : "bg-red-100")
        : "bg-blue-100"
    }`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-gray-900">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{currentProblem.title}</h2>
        <p className="text-sm text-gray-800 font-sans">{currentProblem.description}</p>
      </div>
      <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateProblem(-1)}
            disabled={currentProblemIndex === 0}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <p className="text-sm">&lt;</p>
          </button>
          <span className="text-sm">
            Problem {currentProblemIndex + 1} of {PROBLEMS.length}
          </span>
          <button 
            onClick={() => navigateProblem(1)}
            disabled={currentProblemIndex === PROBLEMS.length - 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <p className="text-sm">&gt;</p>
          </button>
        </div>

      <div className="flex gap-8">
        <div className="w-3/4">
        <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono">
            {currentProblem.codeLines.map((line, index) => {
              const matches = line.match(/_____\d+_____/g);
              if (!matches) return <div key={index}>{line}</div>;
              
              let parts = line.split(/_____\d+_____/);
              return (
                <div key={index}>
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
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              );
            })}
          </pre>
        </div>
        
        <div className="w-1/4">
          <div className="space-y-2">
            {currentProblem.tokens.map((token, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(token)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm"
              >
                {token}
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={checkAnswers}
              disabled={!allAnswersFilled()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Check Answers
            </button>
            <button
              onClick={clearAnswers}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
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
