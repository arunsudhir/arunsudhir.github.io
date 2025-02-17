import React from "react";
import CodePractice from "./components/CodePractice"; // Import the component
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

export default App;