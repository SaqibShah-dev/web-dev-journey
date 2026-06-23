
const NumberList = (props) => {
    const numbers = props.numbers;
    const listItem = numbers.map((number)=><li key={number}>{number}</li>);
  return (
    <div>
      <ul>{listItem}</ul>
    </div>
  );
}

export default NumberList;
