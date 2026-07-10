import { useState } from "react";
import ShowTask from "./components/ShowTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null); 

  function handleSubmit() {
    if (newTask.trim() === "") return;

    if (editId) {
      setTasks(tasks.map(task => 
        task.id === editId ? { ...task, task: newTask } : task
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), task: newTask }]);
    }
    
    setNewTask(""); 
  }
  function handleCancel(){
    setEditId(null);
    setNewTask("");
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <input 
        type="text" 
        placeholder="Add a new task" 
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editId ? "Update Task" : "Add Task"}
      </button>
      {editId && <button onClick ={handleCancel}>Cancel</button>} 

      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <ShowTask 
            key={task.id} 
            tasks={tasks} 
            setTasks={setTasks} 
            id={task.id}
            task={task} 
            editId={editId}
            setNewTask={setNewTask} 
            setEditId={setEditId} 
          />
        ))
      ) : (
        "No tasks available"
      )}
    </div>
  );
};

export default App;