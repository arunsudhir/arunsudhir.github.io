import { useState, useEffect } from "react";
import { loadPyodide, PyodideInterface } from "pyodide";

const usePyodide = () => {
    const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
    const [output, setOutput] = useState<string>("");

    useEffect(() => {
        const initPyodide = async () => {
            const py = await loadPyodide();
            setPyodide(py);
        };
        initPyodide();
    }, []);

    const runPython = async (code: string) => {
        if (!pyodide) return;
        try {
            const result = pyodide.runPython(code);
            setOutput(String(result));
        } catch (error) {
            setOutput(`Error: ${(error as Error).message}`);
        }
    };

    return { runPython, output };
};

export default usePyodide;
