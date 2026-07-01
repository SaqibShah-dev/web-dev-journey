import { memo } from "react";

const Child2 = memo(({value}) => {
  console.log("Child 2 rerendered");
  return (
    <div>
      <p>Child2: {value}</p>
    </div>
  );
});

export default Child2;
