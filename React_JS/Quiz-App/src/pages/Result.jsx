import React from 'react';
import { useQuizScore } from '../context/useQuizScore';
import { Link } from 'react-router-dom';

const Result = () => {
  const { score, resetQuiz } = useQuizScore();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '40px auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Quiz Results</h2>
      
      <div style={{ margin: '20px 0', fontSize: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p><strong>Total Answered:</strong> {score.total}</p>
        <p style={{ color: 'green' }}><strong>Correct Answers:</strong> {score.correct}</p>
        <p style={{ color: 'red' }}><strong>Incorrect Answers:</strong> {score.incorrect}</p>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <Link to="/" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
          Back to Quiz
        </Link>
        <button 
          onClick={resetQuiz} 
          style={{ padding: '10px 20px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reset Score
        </button>
      </div>
    </div>
  );
}

export default Result;