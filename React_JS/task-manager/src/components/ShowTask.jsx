import React from 'react';

const ShowTask = ({ setTasks, id, tasks, task, setNewTask, editId, setEditId }) => {

  function handleDelete() {
    const deletedTask = tasks.filter((currentTask) => currentTask.id !== task.id);
    console.log("editId:", editId, "task.id:", task.id);
    setTasks(deletedTask);
    if (editId === task.id) {
      console.log("editId:", editId, "task.id:", task.id);
      setNewTask("");
      setEditId(null);
    }
  }

  function handleEditMode() {
    setNewTask(task.task);
    setEditId(id);
  }

  return (
    <ul>
      <li>
        {task.completeTask ? <s>{task.task}</s> : task.task}
        <button onClick={handleEditMode}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        <input type="checkbox" id={id} name={task}  checked={task.completeTask} onChange={(e) => {
          setTasks(tasks.map(t => 
            t.id === task.id ? { ...t, completeTask: e.target.checked } : t
          ));
        }}/>
        <label htmlFor={id}> Completed</label><br></br>
      </li>
    </ul>
  );
}

export default ShowTask;