// useReducer is a React Hook for managing complex state logic — it's an alternative to 
// useState when your state has multiple sub-values or when the next state depends on the
//  previous one.
// It's inspired by the Redux pattern: you dispatch actions, and a reducer function decides 
// how state should change.

import Counter from "./components/Counter";
import Form from "./components/Form";


// Basic Syntax
// const [state, dispatch] = useReducer(reducer, initialState);

// reducer — a pure function (state, action) => newState
// initialState — the starting state value
// state — the current state
// dispatch — a function you call to trigger state changes

const App = () => {
  return (
    <div>
      <Counter />
      <Form />
    </div>
  );
}

export default App;
