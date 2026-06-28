import { useReducer } from "react";

const Counter = () => {
    const initialState = { count: 0 };

    const [state, dispatch] = useReducer(reducer, initialState);

    function reducer(state, action) {
        switch (action.type) {
            case "increment": return { count: state.count + 1 };
            case "decrement": return { count: state.count - 1 };
            case "reset": return initialState;
            default: throw new Error("Unknown action: " + action.type);
        }
    }

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        </div>
    );
}

export default Counter;



//     useState  vs useReducer
//    Situation  Use
// Simple independent values           useState
// Multiple related values             useReducer
// Next state depends on previous      useReducer
// Complex update logic                useReducer
// Easy to test state transitions      useReducer
