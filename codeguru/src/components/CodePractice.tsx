import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { CODING_PROBLEMS } from '../data/problems';
import {TAG_METADATA} from '../data/types'
import type { CodingProblem, ProblemTag } from '../data/types';
import CollapsibleTags from './CollapsibleTags';
import * as Diff from 'diff';






const CodePractice = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [draggedToken, setDraggedToken] = useState<string | null>(null);
  const [filledAnswers, setFilledAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [completedProblems, setCompletedProblems] = useState(new Set());
  const [showHint, setShowHint] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  //const [selectedTags, setSelectedTags] = useState<Set<ProblemTag>>(new Set());
  // Add state for selected tags
  const [selectedTags, setSelectedTags] = useState<ProblemTag[]>([]);
  // fill editor related commands
  const [showFullEditor, setShowFullEditor] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<React.ReactNode | null>(null);




  // Filter problems based on selected tags
  const filteredProblems = CODING_PROBLEMS.filter(problem => {
    // If no tags are selected, show all problems
    if (selectedTags.length === 0) return true;
    // Show problems that have at least one of the selected tags
    return selectedTags.some(tag => problem.tags.includes(tag));
  });

  const currentProblem = filteredProblems[currentProblemIndex];

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
    if (newIndex < CODING_PROBLEMS.length) {
      setCurrentProblemIndex(newIndex);
      setFilledAnswers({});
      setShowResults(false);
      setShowHint(null);
    }
  };

  // not used cuurently
  const navigateProblem = (direction : number) => {
    const newIndex = currentProblemIndex + direction;
    if (newIndex >= 0 && newIndex < CODING_PROBLEMS.length) {
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
        if (currentProblemIndex < CODING_PROBLEMS.length - 1) {
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

  // Handle tag selection
  const handleTagSelect = (tag: ProblemTag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  // Handle tag deselection
  const handleTagDeselect = (tag: ProblemTag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
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

  // full editor realted stuff
  const handleAttemptFullCode = () => {
    setShowFullEditor(true);
  };
  const handleNextQuestion = () => {
    setCurrentProblemIndex((prevIndex) => (prevIndex + 1) % CODING_PROBLEMS.length);
    setShowFullEditor(false);
    setUserCode('');
    setFeedback(null);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserCode(event.target.value);
  };

  const normalizeCode = (code: string) => {
    return code
      .split("\n")
      .map(line => line.trim())  // Remove leading/trailing spaces
      .filter(line => line !== "")  // Remove empty lines
      .join("\n");
  };
  
  const handleSubmit = () => {
    // Construct expected solution
    const expectedSolution = normalizeCode(
      currentProblem.codeLines.map(line =>
        line.replace(/_____(\d+)_____/g, (_, match) => currentProblem.solutions[match] || '_____')
      ).join("\n")
    );
  
    // Normalize user's code
    const cleanedUserCode = normalizeCode(userCode);
  
    console.log("Expected Solution:\n", expectedSolution);
    console.log("User's Code:\n", cleanedUserCode);
  
    if (cleanedUserCode === expectedSolution) {
      setFeedback("✅ Correct solution! Well done.");
    } else {
      // Generate diff
      const diffResult = Diff.diffLines(expectedSolution, cleanedUserCode);
      setFeedback(
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          <p className="font-bold">❌ Incorrect. Try again.</p>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded-md">
            {diffResult.map((part, index) => (
              <span
                key={index}
                className={part.added ? "bg-green-300" : part.removed ? "bg-red-300" : ""}
              >
                {part.value}
              </span>
            ))}
          </pre>
        </div>
      );
    }
  };

  return (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-900">
    {/* Tag Filter Section */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter by Topic:</h3>
      <CollapsibleTags
        currentTags={currentProblem.tags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        onTagDeselect={handleTagDeselect}
      />
    </div>

    {/* Problem Title & Description */}
    <div className="mb-8 space-y-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {currentProblem.title}
      </h2>
      <p className="text-lg text-gray-700 font-sans leading-relaxed">
        {currentProblem.description}
      </p>
    </div>

    {/* Toggle Between Partial Code & Full Code Editor */}
    {!showFullEditor ? (
      <div className="flex gap-8">
        {/* Partial Code View */}
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

          {/* Navigation & Full Code Attempt Button */}
          <div className="mt-4 flex flex-col gap-4">
            <button
              onClick={checkAnswers}
              disabled={!allAnswersFilled()}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answers
            </button>
            <button
              onClick={clearAnswers}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all hover:scale-105"
            >
              Clear Answers
            </button>
            <button
              onClick={() => setShowFullEditor(true)}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all hover:scale-105"
            >
              Attempt Full Code
            </button>
          </div>
        </div>

        {/* Draggable Tokens for Partial Code */}
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
        </div>
      </div>
    ) : (
      // Full Code Editor Section
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">{currentProblem.title}</h2>
        <p className="text-lg text-gray-700">{currentProblem.description}</p>

        {/* Full Code Input */}
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="w-full h-64 p-4 border rounded-lg font-mono"
          placeholder="Write your code here..."
        />

        {/* Full Code Submission & Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all hover:scale-105"
          >
            Submit Code
          </button>
          <button
            onClick={() => setShowFullEditor(false)}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all hover:scale-105"
          >
            Back to Partial Code
          </button>
        </div>

        {/* Feedback Message */}
        {feedback && <p className="mt-4 text-lg">{feedback}</p>}
      </div>
    )}

    {/* Next Question Button */}
    {currentProblemIndex < CODING_PROBLEMS.length - 1 && (
      <button
        onClick={navigateNext}
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transform transition-all hover:scale-105"
      >
        Next Question <ArrowRight className="w-4 h-4" />
      </button>
    )}
  </div>
);
};
export default CodePractice;
