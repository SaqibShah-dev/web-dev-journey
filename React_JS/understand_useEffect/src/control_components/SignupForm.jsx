// Form validation — real time and on submit
// Real time validation:

import { useState } from "react";
const SignupForm = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailError = email && !email.includes("@")
    ?"Invalid email address":
    "";

    const passwordError = password && password.length <8
    ?"Password must be atleast 8 characters":
    "";

    const isValid = email && password && !emailError && !passwordError;
  return (
    <form>
        <div>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
      placeholder="Enter your email"
      style={{border:email?"2px solid red":"2px solid #ccc"}}
      />
      {emailError && (
        <p style={{color:"red",fontSize:"12px"}}>{emailError}</p>
      )}
    </div>
    <div>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
        placeholder="Enter your password"
        style={{border:passwordError ? "2px solid red":"2px solid #ccc"}}
        />
        {passwordError &&(
            <p style={{color:"red",fontSize:"12px"}}>{passwordError}</p>
        )}
    </div>
    <button type="submit" disabled={isValid}>Sign Up</button>
    </form>
  );
}

export default SignupForm;
