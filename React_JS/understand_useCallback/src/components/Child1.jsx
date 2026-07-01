import { memo } from "react";

const Child1 = memo(({value,updateValue}) => {
     console.log("Child 1 rerendered");
  return (
    <div>
      <p>Child 1 - {value}</p>
      <button onClick={updateValue}>Update Child 1</button>
    </div>
  );
})

export default Child1;
