import { useState } from "react";
import useTaskStore from "../store/useTaskStore";

function TaskInput() {
    const [text, setText] = useState("");
    const addTask = useTaskStore((state) => state.addTask);

    function handleAdd() {
        if (text.trim() === "") return;
        addTask(text);
        setText("");
    }

    return (
        <div>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="New task"
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}


export default TaskInput;