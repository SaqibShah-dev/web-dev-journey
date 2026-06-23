// What Is React Conditional Rendering?
// In React, conditional rendering is the process of displaying different content based 
// on certain conditions or states. It allows you to create dynamic user interfaces that 
// can adapt to changes in data and user interactions.
// In this process, you can use conditional statements to decide what content should be 
// rendered.

// Why Conditional Rendering is Necessary in React Applications
// There are several reasons why you might want to use conditional rendering in your React 
// applications:

// 1)Improved User Experience: Conditional rendering allows you to create dynamic user interfaces 
//     that adapt to changes in data and user interactions. By showing and hiding content based 
//     on the user's actions or the application state, you can create a more intuitive and 
//     engaging user experience.

// 2)Improved Performance: By conditionally rendering content, you can avoid rendering 
//     unnecessary components and improve the performance of your application. This is 
//      particularly important in larger applications where unnecessary rendering can lead to
//       performance issues.

// 3)Simplified Code: Conditional rendering can help you simplify your code and make it 
//    more readable. By using conditional statements to decide what content should be rendered, 
//     you can avoid duplicating code and create more modular components.

// 4)Flexibility: Conditional rendering allows you to create more flexible and customizable 
//   components. By rendering different content based on the application state, you can create
//   components that can be used in different contexts and adapt to different user interactions.

// How to Implement React Conditional Rendering
// In React, there are different ways to conditionally render content based on the state of 
// a component or other conditions. Two common ways are using the ternary operator and
//  the && operator.

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   return (
//     <div>
//       {isLoggedIn ? (
//         <h1>Welcome back!</h1>
//       ) : (
//         <h1>Please sign up.</h1>
//       )}
//     </div>
//   );
// }

// In the above code, we used the ternary operator isLoggedIn ? ... : ... to conditionally 
// render the message depending on whether the user is logged in or not.

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   return (
//     <div>
//       {isLoggedIn && <h1>Welcome back!</h1>}
//     </div>
//   );
// }

// In the above code, we used the && operator to conditionally render the message if isLoggedIn 
// is true.

// Both of these methods are effective for conditionally rendering content in React. Which one 
// to use often comes down to personal preference or the specific use case.

// The ternary operator may be more useful when there are multiple conditions to check, while 
// the && operator can be simpler and more concise when there is only one condition.

// Choosing which method to use
// if/else before return
// → Use when returning completely different UIs
// → Use for early returns (loading, error, empty states)
// → Use when you have 3+ conditions

// Ternary ? :
// → Use when choosing between TWO things inside JSX
// → Good for toggling text or small components

// && (logical AND)
// → Use when showing something OR nothing
// → ⚠️ Be careful with numbers — use count > 0 && ...

// JSX variable
// → Use when conditional logic is complex
// → Keeps your return statement clean


// // If/else — before return
// if (loading) return <Spinner />;
// if (error) return <Error message={error} />;
// return <MainContent />;

// // Ternary — two options inside JSX
// {isLoggedIn ? <Dashboard /> : <Login />}

// // && — show or nothing
// {isLoading && <Spinner />}
// {error && <p>{error}</p>}
// {user && <UserCard user={user} />}

// // ⚠️ Number gotcha
// {count > 0 && <p>{count} items</p>} // ✅
// {count && <p>{count} items</p>}     // ❌ renders "0"

// // JSX variable
// let content = <Default />;
// if (loading) content = <Spinner />;
// if (error) content = <Error />;
// return <div>{content}</div>;

import { useState } from "react";
const ConditionalRendering = () => {
    const [isLogin,setIsLogIn] = useState(false);
  return (
    <div>
        <button onClick={()=>setIsLogIn(!isLogin)}>Change LogIn Statuse</button>
      {/* {isLogin ? (
        <h1>Welcome Back!</h1>
      ):(
        <h1>Please Sign up</h1>
      )} */}

      {isLogin &&<h1>Welcome Back!</h1>}
    </div>
  );
}

export default ConditionalRendering;
