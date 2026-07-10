import { useState } from "react";
import ShowTask from "./components/ShowTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  function handleSubmit() {
    if (newTask.trim() === "") return;

    if (editId) {
      setTasks(tasks.map(task =>
        task.id === editId ? { ...task, task: newTask } : task
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), task: newTask, completeTask: false }]);
    }

    setNewTask("");
  }
  function handleCancel() {
    setEditId(null);
    setNewTask("");
  }

  const filteredList = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completeTask;
    if (filter === "completed") return task.completeTask;
    return true;
  });

  let message = "";
if (tasks.length === 0) {
    message = "No Task available";
} else if (filteredList.length === 0) {
    message = "No tasks available for the selected filter";
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
      {editId && <button onClick={handleCancel}>Cancel</button>}
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>Todo List Filter</h2>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{ fontWeight: filter === 'all' ? 'bold' : 'normal', marginRight: '5px' }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            style={{ fontWeight: filter === 'active' ? 'bold' : 'normal', marginRight: '5px' }}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
          >
            Completed
          </button>
        </div>
      </div>
      {
    filteredList.length > 0 ? (
        filteredList.map((task, index) => (
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
        message
    )
}
    </div>
  );
};

export default App;