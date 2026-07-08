import React from 'react';

const ShowTask = ({ setTasks, tasks, task, setNewTask, setEditId }) => {

  function handleDelete() {
    const deletedTask = tasks.filter((currentTask) => currentTask.id !== task.id);
    setTasks(deletedTask);
    setEditId(null);
  }

  function handleEditMode() {
    setNewTask(task.task);
    setEditId(task.id);    
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