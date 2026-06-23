import { useState } from "react";
const RegistrationForm = () => {
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:"",
        city:"",
    });
    function handleChange(e){
        const {name,value} = e.target;
        setForm((prev=>({...prev,[name]:value})));
    }
  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange}  placeholder="Enter your name"/>
      <input type="email" name="email" value={form.email} onChange={handleChange}  placeholder="Enter your email"/>
      <input type="password" name="password" value={form.password} onChange={handleChange}  placeholder="Enter your password"/>
      <input name="city" value={form.city} onChange={handleChange}  placeholder="Enter your city"/>
    </form>
  );
}

export default RegistrationForm;
