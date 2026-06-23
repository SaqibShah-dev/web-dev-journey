import { useState } from "react";

const FormSubmission = () => {
    const [form,setForm] = useState({
        email: "",
        password:""
    });
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    function handleChange(e){
        const {name,value} = e.target;
        setForm((prev)=>({...prev,[name]:value}));
    }
    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if(!form.email || !form.password){
                throw new Error("Please fill all fields");
            }
            const response = await fetch("/api/login",{
                method: "Post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(form)
            });
            if(!response.ok){
                throw new Error("Login failed");
            }
            const data = await response.json();
            alert("Login successfully ",data);
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }
  return (
    <form onSubmit={handleSubmit}>
      <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange} placeholder="Enter your email" />
      <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange} placeholder="Enter your password" />

      {error && <p style={{color:"red"}}>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Loading ..":"Login"}</button>
    </form>
  );
}

export default FormSubmission;
