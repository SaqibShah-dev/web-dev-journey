import React, { useState, useRef } from 'react';

function RenderChecker() {
  const [stateCounter, setStateCounter] = useState(0);
  const refCounter = useRef(0);

  // This log will run EVERY time the component renders
  console.log("🎨 Component rendered!");

  const incrementState = () => {
    setStateCounter(stateCounter + 1);
  };

  const incrementRef = () => {
    refCounter.current = refCounter.current + 1;
    // We log the current ref value to the console to prove it IS changing
    console.log(`Ref updated to: ${refCounter.current} (but did the UI change?)`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Check your browser console!</h2>
      
      <div>
        <h3>State Counter: {stateCounter}</h3>
        <button onClick={incrementState}>Increment State (Triggers Render)</button>
      </div>

      <hr />

      <div>
        <h3>Ref Counter (Visual): {refCounter.current}</h3>
        <button onClick={incrementRef}>Increment Ref (No Render)</button>
      </div>
    </div>
  );
}

export default RenderChecker;