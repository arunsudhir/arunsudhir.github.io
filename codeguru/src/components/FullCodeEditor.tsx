import { ReactNode } from 'react';

// Define the shape of props that our FullCodeEditor component accepts
// This interface helps TypeScript ensure we're passing the correct props
interface FullCodeEditorProps {
    // The current code content in the editor
    userCode: string;
    
    // Function to update the code content
    // Takes a string parameter and returns void (nothing)
    setUserCode: (code: string) => void;
    
    // Handler for keyboard events in the textarea
    // Uses React's KeyboardEvent type specifically for textarea elements
    handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    
    // Function to process code submission
    handleSubmit: () => void;
    
    // Function to switch back to partial code view
    handleBackToPartial: () => void;
    
    // Feedback message to display to the user
    // Can be null when there's no feedback to show
    feedback: ReactNode | string ;
  }
  
  // Define the FullCodeEditor component
  // We explicitly type the props using our interface instead of React.FC
  // This gives us more precise control over the component's type definition
  const FullCodeEditor = ({ 
    userCode, 
    setUserCode, 
    handleKeyDown, 
    handleSubmit, 
    handleBackToPartial,
    feedback 
  }: FullCodeEditorProps) => {
    return (
      // Main container with flex column layout and consistent spacing
      <div className="flex flex-col gap-6">
        {/* Code input area */}
        <textarea
          value={userCode}
          // Explicitly type the event parameter for better type safety
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-64 p-4 border rounded-lg font-mono text-sm leading-tight"
          placeholder="Write your code here..."
        />
        
        {/* Action buttons container */}
        <div className="flex gap-4">
          {/* Submit button with success/action styling */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all hover:scale-105"
          >
            Submit Code
          </button>
  
          {/* Navigation button with neutral styling */}
          <button
            onClick={handleBackToPartial}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all hover:scale-105"
          >
            Back to Partial Code
          </button>
        </div>
  
        {/* Conditional feedback display */}
        {feedback && <p className="mt-4 text-lg">{feedback}</p>}
      </div>
    );
  };
  
  // Export the component as the default export
  export default FullCodeEditor;