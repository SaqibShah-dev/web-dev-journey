import React from 'react';
import TaskInput from './components/TaskInput';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div>
       <h1>Task Manager</h1>
            <TaskInput />
            <FilterButtons />
            <TaskList />
    </div>
  );
}

export default App;
