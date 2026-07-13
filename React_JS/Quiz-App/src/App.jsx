import React from 'react';
import { Routes, Route } from "react-router-dom";
import Quiz from './pages/Quiz';
import { Toaster } from "react-hot-toast"; 
import Result from './pages/Result';

const App = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/result' element={<Result/>} />
      </Routes>
    </div>
  );
}

export default App;