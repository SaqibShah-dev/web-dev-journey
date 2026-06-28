// TaskManager.jsx
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";

function TaskManager() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [input, setInput] = useState("");

    function addTask() {
        if (input.trim() === "") return;
        setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
        setInput("");
    }

    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="New task"
            />
            <button onClick={addTask}>Add</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;