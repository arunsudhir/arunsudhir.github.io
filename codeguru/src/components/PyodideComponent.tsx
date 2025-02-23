import React, { useState } from "react";
import usePyodide from "../hooks/usePyodide";

const PyodideComponent: React.FC = () => {
    const { runPython, output } = usePyodide();
    const [code, setCode] = useState<string>("print('Hello from Pyodide!')");

    return (
        <div>
            <h2>Run Python in React (TypeScript)</h2>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={4}
                cols={50}
            />
            <button onClick={() => runPython(code)}>Run</button>
            <h3>Output:</h3>
            <pre>{output}</pre>
        </div>
    );
};

export default PyodideComponent;
