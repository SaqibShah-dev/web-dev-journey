// memo
// memo is an higher order component that you can import from react library and used to 
// memorize a component along with the props passed to that component. It looks a bit 
// theoretical, right? Don’t worry let’s give it a try with coding example,

// Let suppose you have a Parent component and it has two child components in it. And you 
// are calling both the child components in parent component. Something similar to,

// const Parent = () => {
//   return (
//     <>
//       <p>Parent</p>
//       <Child1 />
//       <Child2 />
//     </>
//   );
// };

// const Child1 = () => {
//   return (
//     <p>Child 1</p>
//   );
// };

// const Child2 = () => {
//   return (
//     <p>Child 2</p>
//   );
// };

// export default Parent;
// Looking at the above code, we have called child components in parent component. Just 
// remember one concept if you don’t know, “whenever a state of parent component get’s 
// updated all it’s child components get’s rendered along side that parent component”.

// Now, let’s declare 3 states in parent component,

// const Parent = () => {
//   const [parent, setParent] = useState(0);
//   const [child1, setChild1] = useState(0);
//   const [child2, setChild2] = useState(0);

//   return (
//     <>
//       <p>Parent</p>
//       <Child1 />
//       <Child2 />
//     </>
//   );
// };
// And then pass the states to relevant components. What I mean by this is, pass child1 
// state to Child1 component and child2 state to Child2 component. Something like,

// const Parent = () => {
//   const [parent, setParent] = useState(0);
//   const [child1, setChild1] = useState(0);
//   const [child2, setChild2] = useState(0);

//   console.log("Parent rerendered");

//   return (
//     <>
//       <p>Parent - {parent}</p>
//       <Child1 value={child1} />
//       <Child2 value={child2} />
//     </>
//   );
// };

// const Child1 = ({ value }) => {
//   console.log("Child 1 rerendered");

//   return (
//     <p>Child 1 - {value}</p>
//   );
// };

// const Child2 = ({ value }) => {
//   console.log("Child 2 rerendered");

//   return (
//     <p>Child 2- {value}</p>
//   );
// };
// Everything’s good and aligned till now? I would suggest doing everything with me 
// and try that out at your side, you can copy these codes as it is and these will work 
// fine, hopefully.

// Now, let’s change the parent state, and see if our point (when parent render all of 
//   it’s childs also renders) is justified or not,

// const Parent = () => {
//   const [parent, setParent] = useState(0);
//   const [child1, setChild1] = useState(0);
//   const [child2, setChild2] = useState(0);

//   const updateParent = () => {
//     setParent(Math.floor(Math.random() * 100) + 1);
//   };

//   console.log("Parent rerendered");

//   return (
//     <>
//       <p>Parent - {parent}</p>
//       <button onClick={updateParent}>Update Parent</button>
//       <Child1 value={child1} />
//       <Child2 value={child2} />
//     </>
//   );
// };

// const Child1 = ({ value }) => {
//   console.log("Child 1 rerendered");

//   return (
//     <p>Child 1 - {value}</p>
//   );
// };

// const Child2 = ({ value }) => {
//   console.log("Child 2 rerendered");

//   return (
//     <p>Child 2- {value}</p>
//   );
// };
// We have just changed the parent state value and have set a random value in it. Now, the
//  important thing is click on Update parent button that we have created in parent and look 
//  at your console, you will see 3 consoles there,

// Parent rendered
// Child 1 rendered
// Child 2 rendered
// You see, we haven’t done anything with child component just changed the state of parent 
// and still consoles in child components also get’s rendered. But you can see Child1 or 
// Child2 has nothing to do with parent state we are not using it in child components then
//  why is it rendering? This is what we have just seen whenever parent state changes all 
//  childs also renders.

// Now, let’s try one more thing and change child1 and child2 states as well,

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
//       <button onClick={updateChild1}>Update Child 1</button>
//       <button onClick={updateChild2}>Update Child 2</button>
//       <Child1 value={child1} />
//       <Child2 value={child2} />
//     </>
//   );
// };

// const Child1 = ({ value }) => {
//   console.log("Child 1 rerendered");

//   return (
//     <p>Child 1 - {value}</p>
//   );
// };

// const Child2 = ({ value }) => {
//   console.log("Child 2 rerendered");

//   return (
//     <p>Child 2- {value}</p>
//   );
// };
// Now, try changing Child 1 and Child 2 values by clicking on respective buttons and this
//  will more sense to you, Child1 has child1 state and when we update that why Child2 is 
//  rendering? and same with child2 as well. We should prevent this somehow, because I 
//  don’t want to rerender Child2 when Child1’s state is update and same with the other one.

// This is where “memo” comes into picture, let’s try using the memo and see what happens 
// and then we will talk about it,

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
//       <button onClick={updateChild1}>Update Child 1</button>
//       <button onClick={updateChild2}>Update Child 2</button>
//       <Child1 value={child1} />
//       <Child2 value={child2} />
//     </>
//   );
// };

// const Child1 = memo(({ value }) => {
//   console.log("Child 1 rerendered");

//   return (
//     <p>Child 1 - {value}</p>
//   );
// });

// const Child2 = memo(({ value }) => {
//   console.log("Child 2 rerendered");

//   return (
//     <p>Child 2- {value}</p>
//   );
// });
// What we have done is we have imported memo from react library and wrapped our child 
// components into it. Now, click on buttons one by one and see the behavior, you will
//  see now whenever we change parent state no child is rendering this is because parent
//   state is not using by ant of the childs and when we update child1 only parent and 
//   child1 get’s rendered because only parent and child1 components has child1 state. 
//   Same with the Child2.


import Child1 from "./components/Child1";
import Child2 from "./components/Child2";
import { useState } from "react";

const App = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

   const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };
  const updateChild1 = () => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild2 = () => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  };
  console.log("Parent rerendered");
  return (
    <div>
       <p>Parent - {parent}</p>
       <button onClick={updateParent}>Update Parent</button>
        <button onClick={updateChild1}>Update Child 1</button>
      <button onClick={updateChild2}>Update Child 2</button>
      <Child1 value={child1} />
      <Child2 value={child2} />
    </div>
  );
}

export default App;
