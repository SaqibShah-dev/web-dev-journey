import React from 'react';
import {Routes,Route} from "react-router-dom";
import Quiz from './pages/Quiz';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Quiz/>} />
      </Routes>
    </div>
  );
}

export default App;
