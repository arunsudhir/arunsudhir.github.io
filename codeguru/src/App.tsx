import React from "react";
import CodePractice from "./CodePractice"; // Import the component
import "./App.css"; // Optional: Keep styles if needed

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Code Practice</h1>
        <CodePractice /> {/* Integrate your component here */}
      </header>
    </div>
  );
} 


/*
function App() {
  return (
    <div className="bg-blue-500 text-white p-4">
      <h1 className="text-3xl font-bold">Tailwind is working! 🎉</h1>
    </div>
  );
}
*/
export default App;