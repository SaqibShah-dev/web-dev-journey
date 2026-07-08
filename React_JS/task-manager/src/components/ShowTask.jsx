import React from 'react';
import UpdateTask from './UpdateTask';
import { useState } from 'react';

const ShowTask = ({ setTasks, tasks, task,index, setNewTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  function handleDelete(){
    console.log("Deleting task at index:", index, "with value:", task);
    const deletedTask = tasks.filter((currentTask, currentIndex) => currentIndex !== index);
    console.log("Deleted task:", deletedTask);
    setTasks(deletedTask);
  }
  return (
    <ul>
      <li>{task}<button onClick={() => setIsEditing(true)}>Update</button><button onClick={handleDelete}>Delete</button></li>
      {isEditing && <UpdateTask setIsEditing={setIsEditing} setTasks={setTasks} task={task} index={index} />}
    </ul>
  );
}

export default ShowTask;
