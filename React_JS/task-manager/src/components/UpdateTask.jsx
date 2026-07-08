import { useState } from 'react';

const UpdateTask = ({setIsEditing, setTasks, task, index }) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const handleUpdate = () => {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      console.log("Updating task at index:", index, "with value:", updatedTask," previous value:", newTasks);
      newTasks[index] = updatedTask;
      console.log("Updated task:", newTasks[index]);
      setIsEditing(false);
      return newTasks;
    });
  };
  return (
    <>
      <input type="text" value={updatedTask} onChange={(e) => setUpdatedTask(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </>
  );
}
export default UpdateTask;
