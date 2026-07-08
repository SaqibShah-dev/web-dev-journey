import { useState } from "react"
import ShowTask from "./components/ShowTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask()
  {
    if(newTask.trim() !==""){
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
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
      <button onClick={addTask} >Add Task</button>
      {tasks.length >0 ? (
        tasks.map((task,index)=>{
          return(<ShowTask tasks={tasks} setTasks={setTasks} setNewTask={setNewTask} key={index} task={task} index={index}/>)
        })
      ):"No tasks available"}
    </div>
  )
}

export default App