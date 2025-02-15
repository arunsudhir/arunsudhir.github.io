import React, { useState } from 'react';

const CodePractice = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [draggedToken, setDraggedToken] = useState(null);
  const [filledAnswers, setFilledAnswers] = useState({});
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
    }
  ];

  const currentProblem = PROBLEMS[currentProblemIndex];

  const handleDragStart = (token) => {
    setDraggedToken(token);
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleDrop = (index) => {
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

  const isAnswerCorrect = (index) => {
    return filledAnswers[index] === currentProblem.solutions[index];
  };

  const allAnswersFilled = () => {
    return Object.keys(currentProblem.solutions).every(index => filledAnswers[index]);
  };

  const getSlotClassName = (index) => {
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
    <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{currentProblem.title}</h2>
        <p className="text-gray-600">{currentProblem.description}</p>
      </div>

      <div className="flex gap-8">
        <div className="w-3/4">
          <pre className="bg-gray-100 p-4 rounded-lg relative font-mono">
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
                            className={getSlotClassName(matches[pIndex].match(/\d+/)[0])}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(matches[pIndex].match(/\d+/)[0])}
                          >
                            {filledAnswers[matches[pIndex].match(/\d+/)[0]] || '_____'}
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
                className="p-2 bg-blue-50 rounded cursor-move hover:bg-blue-100 transition-colors"
              >
                {token}
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={checkAnswers}
              disabled={!allAnswersFilled()}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-blue-500"
            >
              Check Answers
            </button>
            <button
              onClick={clearAnswers}
              className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
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
