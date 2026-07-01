import React from 'react';
import { memo } from 'react';

const Child1 = memo(({value}) => {
  console.log("Child 1 rerendered");
  return (
    <div>
      <p>Child1: {value}</p>
    </div>
  );
});

export default Child1;
