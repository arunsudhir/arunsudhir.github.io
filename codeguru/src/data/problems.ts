import { CodingProblem } from "./types";

export const CODING_PROBLEMS: CodingProblem[] = [
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
          "        if interval.start _____2_____ :",
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
          "    while i < len(intervals) and intervals[i].end _____1_____ :",
          "        merged.append(intervals[i])",
          "        i += 1",
          "",
          "    while i < len(intervals) and intervals[i].start _____2_____ :",
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