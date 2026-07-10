import React from 'react';

const ShowTask = ({ setTasks,id, tasks, task, setNewTask,editId, setEditId }) => {

  function handleDelete() {
    const deletedTask = tasks.filter((currentTask) => currentTask.id !== task.id);
    console.log("editId:", editId, "task.id:", task.id);
    setTasks(deletedTask);
    if(editId === task.id){
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
        {task.task} 
        <button onClick={handleEditMode}>Update</button>
        <button onClick={handleDelete}>Delete</button>

      </li>
    </ul>
  );
}

export default ShowTask;