import { useReducer } from "react";

const initialState = {
    name: "",
    email: "",
    loading: false
};

function reducer(state, action) {
  console.log("payload",action.payload);
  
    switch (action.type) {
        case "name":
            return { ...state, name: action.payload }; // ✅ spread state + update name

        case "email":
            return { ...state, email: action.payload }; // ✅ spread state + update email

        case "setLoading":
            return { ...state, loading: action.payload }; // ✅ update loading

        case "reset":
            return initialState; // ✅ reset everything

        default:
            return state; // ✅ always have a default!
    }
}

const Form = () => {
    // ✅ state returned by useReducer — this is what updates
    const [state, dispatch] = useReducer(reducer, initialState);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!state.name || !state.email) {
            alert("Please fill all fields");
            return;
        }

        dispatch({ type: "setLoading", payload: true }); // show loading

        // simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Submitted:", { name: state.name, email: state.email });

        dispatch({ type: "setLoading", payload: false }); // hide loading
        dispatch({ type: "reset" }); // clear form
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="name-container">
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={(e) => dispatch({
                        type: "name",
                        payload: e.target.value
                    })}
                    placeholder="Enter your name"
                />
            </div>

            <div className="email-container">
                <input
                    type="email"
                    name="email"
                    value={state.email} 
                    onChange={(e) => dispatch({
                        type: "email",
                        payload: e.target.value 
                    })}
                    placeholder="Enter your email"
                />
            </div>

            <button
                type="submit"
                disabled={state.loading} 
            >
                {state.loading ? "Loading....." : "Submit"} 
            </button>
        </form>
    );
}

export default Form;