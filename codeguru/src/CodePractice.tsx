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
      "1": "Initialize the right boundary of the search to the last index of the array.",
      "2": "Continue searching while the left index does not surpass the right index.",
      "3": "Find the middle index of the current search range.",
      "4": "If the middle element is smaller than the target, narrow the search to the right half.",
      "5": "If the middle element is greater than the target, narrow the search to the left half."
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
      "1": "Expand the window by adding the current element to the running sum.",
      "2": "Shrink the window when the sum meets or exceeds the target value.",
      "3": "Update the minimum length by considering the current window size.",
      "4": "Since we're shrinking the window, subtract the element at the start of the window.",
      "5": "Move the window forward by incrementing the start index."
    }
  },
  {
    "id": "longest-substring-k-distinct",
    "title": "Longest Substring with K Distinct Characters",
    "description": "Complete the code to find the length of the longest substring with no more than K distinct characters.",
    "codeLines": [
        "def findLength(self, str1, k):",
        "    window_start = 0",
        "    max_length = 0",
        "    char_frequency = {}",
        "",
        "    for window_end in range(len(str1)):",
        "        right_char = str1[window_end]",
        "        if right_char not in char_frequency:",
        "            _____1_____",
        "        _____2_____",
        "",
        "        while len(char_frequency) > k:",
        "            left_char = str1[window_start]",
        "            _____3_____",
        "            if char_frequency[left_char] == 0:",
        "                _____4_____",
        "            window_start += 1",
        "",
        "        max_length = max(max_length, _____5_____)",
        "    return max_length"
    ],
    "tokens": [
        "char_frequency[right_char] = 0",
        "char_frequency[right_char] += 1",
        "char_frequency[left_char] -= 1",
        "del char_frequency[left_char]",
        "window_end - window_start + 1",
        "char_frequency.clear()",
        "window_start - window_end",
        "len(char_frequency)"
    ],
    "solutions": {
        "1": "char_frequency[right_char] = 0",
        "2": "char_frequency[right_char] += 1",
        "3": "char_frequency[left_char] -= 1",
        "4": "del char_frequency[left_char]",
        "5": "window_end - window_start + 1"
    },
    "hints": {
        "1": "Initialize the frequency count for a new character in the window.",
        "2": "Increase the frequency count for the current character.",
        "3": "Decrease the frequency count when shrinking the window.",
        "4": "Remove a character from the frequency dictionary when its count reaches zero.",
        "5": "Track the longest valid substring length."
    }
  },
  {
    "id": "longest-substring-same-letters-replacement",
    "title": "Longest Substring with Same Letters after Replacement",
    "description": "Complete the code to find the length of the longest substring where you can replace up to K letters to make all characters the same.",
    "codeLines": [
        "def findLength(self, str1, k):",
        "    window_start, max_length, max_repeat_letter_count = 0, 0, 0",
        "    frequency_map = {}",
        "",
        "    for window_end in range(len(str1)):",
        "        right_char = str1[window_end]",
        "        if right_char not in frequency_map:",
        "            _____1_____",
        "        _____2_____",
        "",
        "        max_repeat_letter_count = max(max_repeat_letter_count, _____3_____)",
        "",
        "        if (window_end - window_start + 1 - max_repeat_letter_count) > k:",
        "            left_char = str1[window_start]",
        "            _____4_____",
        "            window_start += 1",
        "",
        "        max_length = max(max_length, _____5_____)",
        "    return max_length"
    ],
    "tokens": [
        "frequency_map[right_char] = 0",
        "frequency_map[right_char] += 1",
        "frequency_map[right_char]",
        "frequency_map[left_char] -= 1",
        "window_end - window_start + 1",
        "del frequency_map[left_char]",
        "max_length + 1",
        "max_repeat_letter_count - 1"
    ],
    "solutions": {
        "1": "frequency_map[right_char] = 0",
        "2": "frequency_map[right_char] += 1",
        "3": "frequency_map[right_char]",
        "4": "frequency_map[left_char] -= 1",
        "5": "window_end - window_start + 1"
    },
    "hints": {
        "1": "Initialize the frequency count for a new character in the window.",
        "2": "Increase the frequency count for the current character.",
        "3": "Track the most frequent letter count in the window.",
        "4": "Decrease the frequency count when shrinking the window.",
        "5": "Track the longest valid substring length."
    }
  },
  {
    "id": "merge-intervals",
    "title": "Merge Intervals",
    "description": "Complete the code to merge all overlapping intervals and return a list of mutually exclusive intervals.",
    "codeLines": [
        "class Interval:",
        "    def __init__(self, start, end):",
        "        self.start = start",
        "        self.end = end",
        "",
        "def merge(self, intervals):",
        "    if len(intervals) < 2:",
        "        return intervals",
        "",
        "    intervals.sort(key=lambda x: _____1_____)",
        "",
        "    mergedIntervals = []",
        "    start = intervals[0].start",
        "    end = intervals[0].end",
        "",
        "    for i in range(1, len(intervals)):",
        "        interval = intervals[i]",
        "        if interval.start _____2_____ end:",
        "            end = _____3_____",
        "        else:",
        "            mergedIntervals.append(_____4_____)",
        "            start = interval.start",
        "            end = interval.end",
        "",
        "    mergedIntervals.append(_____5_____)",
        "    return mergedIntervals"
    ],
    "tokens": [
        "x.start",
        "x.end",
        "<= end",
        "> end",
        "max(interval.end, end)",
        "Interval(start, end)",
        "Interval(interval.start, interval.end)",
        "sorted(intervals)",
        "intervals[0].end"
    ],
    "solutions": {
        "1": "x.start",
        "2": "<= end",
        "3": "max(interval.end, end)",
        "4": "Interval(start, end)",
        "5": "Interval(start, end)"
    },
    "hints": {
        "1": "Sort the intervals based on their start times.",
        "2": "Check if the current interval overlaps with the previous one.",
        "3": "If overlapping, update the end time to the maximum end time.",
        "4": "Add the merged interval to the result list when a non-overlapping interval is found.",
        "5": "Ensure the last interval is also added to the result."
    }
  },
  {
    "id": "insert-interval",
    "title": "Insert Interval",
    "description": "Complete the code to insert a new interval into a sorted list of non-overlapping intervals and merge any necessary overlapping intervals.",
    "codeLines": [
        "def insert(self, intervals, new_interval):",
        "    merged = []",
        "    i = 0",
        "",
        "    while i < len(intervals) and intervals[i].end _____1_____ new_interval.start:",
        "        merged.append(intervals[i])",
        "        i += 1",
        "",
        "    while i < len(intervals) and intervals[i].start _____2_____ new_interval.end:",
        "        new_interval.start = _____3_____",
        "        new_interval.end = _____4_____",
        "        i += 1",
        "",
        "    merged.append(_____5_____)",
        "",
        "    while i < len(intervals):",
        "        merged.append(intervals[i])",
        "        i += 1",
        "",
        "    return merged"
    ],
    "tokens": [
        "< new_interval.start",
        "> new_interval.start",
        "<= new_interval.end",
        ">= new_interval.end",
        "min(intervals[i].start, new_interval.start)",
        "max(intervals[i].end, new_interval.end)",
        "new_interval",
        "intervals[i]",
        "merged"
    ],
    "solutions": {
        "1": "< new_interval.start",
        "2": "<= new_interval.end",
        "3": "min(intervals[i].start, new_interval.start)",
        "4": "max(intervals[i].end, new_interval.end)",
        "5": "new_interval"
    },
    "hints": {
        "1": "Skip and add to the output all intervals that end before the new interval starts.",
        "2": "Merge overlapping intervals that start before or when the new interval ends.",
        "3": "Adjust the start of the new interval to merge overlaps.",
        "4": "Adjust the end of the new interval to merge overlaps.",
        "5": "After merging, insert the new interval before adding remaining intervals."
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
