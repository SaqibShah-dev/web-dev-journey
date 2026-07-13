import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState({ correct: 0, incorrect: 0, total: 0 });

  const addCorrectAnswer = () => setScore(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
  const addIncorrectAnswer = () => setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
  const resetQuiz = () => setScore({ correct: 0, incorrect: 0, total: 0 });
  return (
    <QuizContext.Provider value={{ score, addCorrectAnswer, addIncorrectAnswer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizScore = () => useContext(QuizContext);