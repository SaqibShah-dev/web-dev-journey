// What are lists and keys in ReactJS?
// Lists are collections of elements that can be rendered using JSX syntax. JSX allows us
//  to write HTML-like code in JavaScript and use it as React components. For example, we
//   can create a list of numbers using an array and JSX:

import NumberList from "./NumberList";

// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) => <li>{number}</li>);
// The map() method is a JavaScript array function that takes a callback function and 
// applies it to each element of the array, returning a new array with the results. In 
// this case, we are using an arrow function that takes a number as an argument and returns 
// a <li> element with the number as its content.
// We can then use the listItems array as a child element of a <ul> element to render an 
// unordered list:
{/* <ul>{listItems}</ul>
This code will produce the following output:
<ul> <li>1</li> <li>2</li> <li>3</li> <li>4</li> <li>5</li> </ul> */}

// Keys are special string attributes that we need to include when creating lists of elements
//  in React. Keys help React identify which items have changed, are added, or are removed. 
//  Keys should be unique among the siblings of a list, but they can be duplicated globally.
// Keys are important for performance and stability reasons. When React renders a list of
//  elements, it compares the new elements with the previous ones to determine which ones 
//  need to be updated, inserted, or deleted. If we don’t provide keys, React will use the 
//  index of the element as the default key, which can cause problems if the order of the 
//  elements changes or if some elements are added or removed.

// To avoid these issues, we should always provide keys that reflect the identity of each 
// element. The best way to choose a key is to use a string that uniquely identifies the 
// element among its siblings. For example, if we have a list of products, we can use their 
// IDs as keys:
// const products = [
//   { id: 1, name: "Apple", price: 1 },
//   { id: 2, name: "Banana", price: 1.3 },
//   { id: 3, name: "Carrot", price: 2 },
// ];
// const productItems = products.map((product) => (
//   <li key={product.id}>
//     {product.name} - ${product.price}
//   </li>
// ));
// We can then use the productItems array as a child element of a <ul> element to render 
// an unordered list:
{/* <ul>{productItems}</ul>
This code will produce the following output:
<ul> <li>Apple — $1</li> <li>Banana — $1.3</li> <li>Carrot — $2</li> </ul> */}

// How to use lists and keys in ReactJS?
// There are different ways to use lists and keys in ReactJS depending on our needs and 
// preferences. Here are some common scenarios and examples:
// Rendering lists inside components
// Usually, we will render lists inside components that accept an array of data items as props. 
// This way, we can reuse the component for different data sources and make it more modular and 
// maintainable.
// For example, we can create a component called NumberList that takes an array of numbers as 
// props and renders a list of <li> elements with those numbers:
// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) => <li key={number}>{number}</li>);
//   return <ul>{listItems}</ul>;
// }

// We can then use the NumberList component with different arrays of numbers:

// const oddNumbers = [1, 3, 5, 7, 9];
// const evenNumbers = [2, 4, 6, 8, 10];
// This code will produce the following output:

// Extracting components with keys~
// Sometimes, we might want to extract a component for each element of a list to make the 
// code more readable and reusable. For example, we can create a component called Product 
// that takes a product object as props and renders a <li> element with the product name and
//  price:

// function Product(props) {
//   const product = props.product;
//   return (
//     <li>
//       {product.name} - ${product.price}
//     </li>
//   );
// }

// We can then use the Product component inside the map() method to create a list of products:
// const products = [
//   { id: 1, name: "Apple", price: 0.99 },
//   { id: 2, name: "Banana", price: 0.79 },
//   { id: 3, name: "Carrot", price: 0.49 },
// ];
// const productItems = products.map((product) => (
//   <Product key={product.id} product={product} />
// ));
// We can then use the productItems array as a child element of a <ul> element to render an 
// unordered list:

// Using keys with arrays ~
// Sometimes, we might want to use keys with arrays that are not lists of elements. For 
// example, we might want to render multiple components for each item in an array. In this
//  case, we need to provide keys for each component in the array, not for the array itself.
// For example, we can create a component called BlogPost that takes a blog post object as 
// props and renders a <div> element with the post title and content:

// function BlogPost(props) {
//   const post = props.post;
//   return (
//     <div>
//       <h3>{post.title}</h3>
//       <p>{post.content}</p>
//     </div>
//   );
// }
// We can then use the BlogPost component inside the map() method to create an array of 
// blog posts:
// const posts = [
//   { id: 1, title: "Hello World", content: "This is my first blog post." },
//   { id: 2, title: "React Rocks", content: "React is awesome for building user interfaces." },
//   { id: 3, title: "Lists and Keys", content: "Learn how to use lists and keys in ReactJS." },
// ];
// const postElements = posts.map((post) => (
//   <BlogPost key={post.id} post={post} />
// ));


// When is it okay to use index as key?
// Only when ALL of these are true:

// The list is static (never reordered or filtered)
// Items are never deleted from the middle
// Items have no local state (no checkboxes, inputs, animations)

// jsx// ✅ Fine to use index — static list, no state, never changes
// const navItems = ["Home", "About", "Contact"];

// <nav>
//     {navItems.map((item, index) => (
//         <a key={index} href={`/${item.toLowerCase()}`}>{item}</a>
//     ))}
// </nav>


// Basic list rendering
// {items.map(item => (
//     <li key={item.id}>{item.name}</li>
// ))}

// // Key rules:
// // ✅ Use unique stable ID (item.id, item.name if unique)
// // ❌ Don't use array index if list can change
// // ✅ Key goes on the outermost element returned from map
// // ✅ Keys only need to be unique among siblings

// // Common patterns:
// {items.filter(item => item.active)   // filter first
//       .sort((a, b) => a.order - b.order) // then sort
//       .map(item => (                  // then render
//           <Item key={item.id} item={item} />
//       ))
// }

// // Empty state
// {items.length === 0
//     ? <p>No items found</p>
//     : items.map(item => <li key={item.id}>{item.name}</li>)
// }

const ListAndKeys = () => {
    const products = [
  { id: 1, name: "Apple", price: 1 },
  { id: 2, name: "Banana", price: 1.3 },
  { id: 3, name: "Carrot", price: 2 },
];
const productItems = products.map((product) => (
  <li key={product.id}>
    {product.name} - ${product.price}
  </li>
));
const numbers = [1, 2, 3, 4, 5];
const oddNumbers = [1, 3, 5, 7, 9];
const evenNumbers = [2, 4, 6, 8, 10];
  return (
    <div>
      <ul>
        {productItems}
      </ul>
      <NumberList numbers={numbers}/>
      <NumberList numbers={oddNumbers} />
      <NumberList numbers={evenNumbers} />
    </div>
  );
}

export default ListAndKeys;
