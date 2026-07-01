// useCallback
// useCallback memorizes the function and it is a react hook. This seems too theoretical too,
//  right? Let’s start learning it with the easy and fun way,

// Now, what we are doing is we are updating child1 and child2 states with buttons that are 
// present in parent component but what if those buttons needs to be in Child1 and Child2 
// components, we will need to move buttons to it’s components and then the update functions
//  will be passed as props in those components so we can use them right? Enough talking let’s
//   have a look how,

// import { memo } from "react";

// const Parent = () => {
//   const [parent, setParent] = useState(0);
//   const [child1, setChild1] = useState(0);
//   const [child2, setChild2] = useState(0);

//   const updateParent = () => {
//     setParent(Math.floor(Math.random() * 100) + 1);
//   };

//   const updateChild1 = () => {
//     setChild1(Math.floor(Math.random() * 100) + 1);
//   };

//   const updateChild2 = () => {
//     setChild2(Math.floor(Math.random() * 100) + 1);
//   };

//   console.log("Parent rerendered");

//   return (
//     <>
//       <p>Parent - {parent}</p>
//       <button onClick={updateParent}>Update Parent</button>
//       <Child1 value={child1} updateValue={updateChild1} />
//       <Child2 value={child2} updateValue={updateChild2} />
//     </>
//   );
// };

// const Child1 = memo(({ value, updateValue }) => {
//   console.log("Child 1 rerendered");

//   return (
//     <>
//       <p>Child 1- {value}</p>
//       <button onClick={updateValue}>Update Child 1</button>
//     </>
//   );
// });

// const Child2 = memo(({ value, updateValue }) => {
//   console.log("Child 2 rerendered");

//   return (
//     <>
//       <p>Child 2- {value}</p>
//       <button onClick={updateValue}>Update Child 2</button>
//     </>
//   );
// });
// Nothing much changed in the above code just passed the functions to components and moved 
// update buttons to it’s relevant components.

// But, now when you will update any of the values it will lose memorizing the component and 
// again start rendering what we had earlier before using memo. Give it a try and come back.

// Why is it so? we have used memo and it’s memorizing the component and props passing to it
//  then why it’s started re rendering again?

// This is because we have passed updateValue props to the components and updateValue is a 
// function. That is the limitation of memo, memo only memorize the value not 
// functions / objects.

// Why memo cannot memorize functions and objects?

// Functions and objects let’s clarify this first, in javascript functions are also 
// objects (first-class objects). So, objects in javascript are of reference type which 
// means it creates a new reference every time in the memory. So, on every update object
//  is making a new reference and this is the reason why memo is not able to memorize it,
//   because memo is thinking this is a new value and it re renders the component. But 
//   actually functions are same, so here memo has limitation and “useCallback” comes into 
//   picture.

// useCallback says give me a function and I will memorize it even it’s making a new 
// reference in memory every time. So, let’s see how we can use useCallback,

// import { memo } from "react";

// const Parent = () => {
//   const [parent, setParent] = useState(0);
//   const [child1, setChild1] = useState(0);
//   const [child2, setChild2] = useState(0);

//   const updateParent = () => {
//     setParent(Math.floor(Math.random() * 100) + 1);
//   };

//   const updateChild1 = useCallback(() => {
//     setChild1(Math.floor(Math.random() * 100) + 1);
//   }, [child1]);

//   const updateChild2 = useCallback(() => {
//     setChild2(Math.floor(Math.random() * 100) + 1);
//   }, [child2]);

//   console.log("Parent rerendered");

//   return (
//     <>
//       <p>Parent - {parent}</p>
//       <button onClick={updateParent}>Update Parent</button>
//       <Child1 value={child1} updateValue={updateChild1} />
//       <Child2 value={child2} updateValue={updateChild2} />
//     </>
//   );
// };

// const Child1 = memo(({ value, updateValue }) => {
//   console.log("Child 1 rerendered");

//   return (
//     <>
//       <p>Child 1- {value}</p>
//       <button onClick={updateValue}>Update Child 1</button>
//     </>
//   );
// });

// const Child2 = memo(({ value, updateValue }) => {
//   console.log("Child 2 rerendered");

//   return (
//     <>
//       <p>Child 2- {value}</p>
//       <button onClick={updateValue}>Update Child 2</button>
//     </>
//   );
// });
// useCallback accepts 2 parameters first is the function that you want to memorize, and 
// second an array which is called dependency array, it behaves similar to useEffect’s 
// dependency array. Whenever value which is present in that dependency array changes only
//  then it will treat the function as new otherwise it will keep it memorized and won’t 
//  re render the component.

// Now, try this code and see, we are again able to handle the re rendering of components.
//  That’s all about useCallback, see how simple is it.




import { useCallback, useState } from "react";
import Child1 from "./components/Child1";
import Child2 from "./components/Child2";

const App = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = useCallback(()=> {
    setChild1(Math.floor(Math.random() * 100) + 1);
  }, []);

  const updateChild2 = useCallback(()=> {
    setChild2(Math.floor(Math.random() * 100) + 1);
  }, []);

  console.log("Parent rerendered");
  return (
    <div>
       <p>Parent - {parent}</p>
      <button onClick={updateParent}>Update Parent</button>
      <Child1 value={child1} updateValue={updateChild1} />
      <Child2 value={child2} updateValue={updateChild2} />
    </div>
  );
}

export default App;
