import { memo } from "react";

const Child2 = memo(({value,updateValue}) => { 
    console.log("Child 2 rerendered");
  return (
    <div>
      <p>Child 2 - {value}</p>
      <button onClick={updateValue}>Update Child 2</button>
    </div>
  );
})

export default Child2;
