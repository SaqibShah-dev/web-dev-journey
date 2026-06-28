import React from 'react';
import { useReducer } from 'react';

const Form = () => {
  const initialState = {
        name:"",
        email:"",
        loading:false
    }
    const [state,dispatch] = useReducer(reducer,initialState);
    function reducer(state,action){
   const {name,email,loading} = initialState;
      switch(action.type){
        case 'name': return {name = state.name}; 
      }
    }
  return (
    <form>
      <div className="name-container">
        <input type='text' name='name' value={initialState.name} onChange={()=>dispatch({type:"name"})} placeholder='Enter your name' /> 
      </div>
      <div className="email-container">
        <input type='email' name='email' value={initialState.email} placeholder='Enter your email'
        onChange={(e)=>dispatch({type:"email"})}/>
       </div>
       <button  disabled={initialState.loading} >{initialState.loading ?"Loading.....":"Submit"}</button>
    </form>
  );
}

export default Form;
