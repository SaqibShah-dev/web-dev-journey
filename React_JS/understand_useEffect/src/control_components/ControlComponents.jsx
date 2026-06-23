// What are Controlled Components?
// Controlled components are form elements (like input, textarea, or select) that are 
// managed by React state. This means that the value of the form element is set and updated 
// through React state, making React the "single source of truth" for the form data.

// By controlling form elements via state, you gain more control over user interactions and
//  can easily enforce validation, format data, and respond to changes.

// Here's an example of a controlled component:
// function ControlledComponent() {
//   const [value, setValue] = useState('');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert('A name was submitted: ' + value);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={value} onChange={handleChange} />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// In this example:

// The value state holds the current value of the input field.
// The handleChange function updates the state whenever the user types in the input field.
// The handleSubmit function handles the form submission, using the current state value.


// In regular HTML, the browser manages the input's value internally:
//  Uncontrolled — browser owns the value 
// <input type="text" />

// In React, YOU manage the input's value through state — React controls what the input shows:
// Controlled — React owns the value
// function App() {
//     const [name, setName] = useState("");

//     return (
//         <input
//             value={name}                              // state controls value
//             onChange={(e) => setName(e.target.value)} // state updates on change
//         />
//     );
// }

// The key difference:
// Uncontrolled: Browser → stores value → you read it when needed
// Controlled:   You → store value in state → React shows it in input

// Why controlled inputs?
// function SearchBar() {
//     const [query, setQuery] = useState("");

//     return (
//         <div>
//             <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//             />

//             {/* Can use query value ANYWHERE — it's just state */}
//             <p>You typed: {query}</p>
//             <p>Characters: {query.length}</p>
//             <button disabled={query === ""}>Search</button>
//         </div>
//     );
// }

// Because the value lives in state, you can:

// Display it anywhere on the page instantly
// Validate it in real time
// Disable buttons based on it
// Clear it programmatically
// Pre-fill it with data

// All input types — how to control each one
// Text input:

// const [name, setName] = useState("");

// <input
//     type="text"
//     value={name}
//     onChange={(e) => setName(e.target.value)}
//     placeholder="Enter name"
// />

// Textarea:
// const [message, setMessage] = useState("");

// <textarea
//     value={message}
//     onChange={(e) => setMessage(e.target.value)}
//     placeholder="Enter message"
//     rows={4}
// />

// Checkbox:
// const [isChecked, setIsChecked] = useState(false);

// <input
//     type="checkbox"
//     checked={isChecked}                         // 'checked' not 'value'
//     onChange={(e) => setIsChecked(e.target.checked)} // 'checked' not 'value'
// />

// Radio buttons:
// const [selected, setSelected] = useState("male");

// <div>
//     <input
//         type="radio"
//         value="male"
//         checked={selected === "male"}
//         onChange={(e) => setSelected(e.target.value)}
//     /> Male

//     <input
//         type="radio"
//         value="female"
//         checked={selected === "female"}
//         onChange={(e) => setSelected(e.target.value)}
//     /> Female
// </div>

// Select dropdown:

// const [city, setCity] = useState("lahore");

// <select
//     value={city}
//     onChange={(e) => setCity(e.target.value)}
// >
//     <option value="lahore">Lahore</option>
//     <option value="karachi">Karachi</option>
//     <option value="islamabad">Islamabad</option>
// </select>

// <p>Selected: {city}</p>

// Number input:


// Number input:
// const [age, setAge] = useState(0);
// <input
//     type="number"
//     value={age}
//     onChange={(e) => setAge(Number(e.target.value))} // convert string to number!
//     min={0}
//     max={120}
// />
// e.target.value always returns a string — even for number inputs. Convert with Number() 
// or parseInt() if you need a number.


// Handling multiple inputs — one handler
// Instead of writing a separate onChange for every single input, use one smart handler 
// that uses e.target.name:

// function RegistrationForm() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         city: ""
//     });

//     // ONE handler for ALL inputs
//     function handleChange(e) {
//         const { name, value } = e.target;
//         setForm(prev => ({ ...prev, [name]: value }));
//         //              ↑ spread existing state
//         //                              ↑ computed property — updates the right field
//     }

//     return (
//         <form>
//             <input
//                 name="name"      {/* must match key in state object */}
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Full name"
//             />
//             <input
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//             />
//             <input
//                 name="password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//             />
//             <input
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 placeholder="City"
//             />
//         </form>
//     );
// }

// [name]: value is a computed property key — name comes from e.target.name (the 
//   input's name attribute), so it dynamically updates the right field in the state object.
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import FormSubmission from "./FormSubmission";
import SignupForm from "./SignupForm";

const ControlComponents = () => {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState("male");
  const [city,setCity] = useState("lahore");
  const [age,setAge] = useState(0);


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A name was submitted: ' + value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>You type: {query}</p>
      <button disabled={query === ""}>Search</button>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        rows={4}
      />

      <input
        type="checkbox"
        checked={isChecked}                         // 'checked' not 'value'
        onChange={(e) => setIsChecked(e.target.checked)} // 'checked' not 'value'
      />

      <div>
        <input
          type="radio"
          value="male"
          checked={selected === "male"}
          onChange={(e) => setSelected(e.target.value)}
        /> Male

        <input
          type="radio"
          value="female"
          checked={selected === "female"}
          onChange={(e) => setSelected(e.target.value)}
        /> Female
      </div>
      <div className="select-box">
        <select
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      >
        <option value="lahore">Lahore</option>
        <option value="islamabad">Islamabad</option>
        <option value="karachi">Karachi</option>
      </select>
      <p>Selected: {city}</p>
      </div>
      <div className="age-box">
        <input 
        type="number"
        value={age}
        onChange={(e)=>setAge(Number(e.target.value))} />
        <p>User age:{age}</p>
      </div>

      <div className="Registration-form">
        <RegistrationForm />
      </div>

      <div className="formsubmission">
        <FormSubmission />
      </div>
      <div className="signup-form">
        <h1>Sign up form</h1>
        <SignupForm />
      </div>
    </>
  );
}

export default ControlComponents;