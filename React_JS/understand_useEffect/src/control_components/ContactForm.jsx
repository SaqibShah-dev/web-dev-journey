import { useState } from "react";

const ContactForm = () => {
    const [form,setForm] = useState({
        name: "",
        email:"",
        message:""
    });
    const [errors,setErrors] = useState({});
    const [submitted,setSubmitted] = useState(false);

    function handleChange(e){
        const {name,value} = e.target;
        setForm(prev=>({...prev,[name]:value}));

        if(errors[name]){
            setErrors(prev=>({...prev,[name]:""}));
        }
    }
    function validate(){
        const newErrors = {};

        if(!form.name.trim()){
            newErrors.name = "Name is required.";
        }
        if(!form.email.includes("@")){
            newErrors.email = "Valid email is required";
        }
        if(form.message.length<10){
            newErrors.message = "Message must be at least 10 characters";
        }
        return newErrors;
    }
    function handleSubmit(e){
        e.preventDefault();
        const newErrors = validate();

        if(Object.keys(newErrors).length >0){
            setErrors(newErrors);
            return;
        }
        alert("Form submitted successfully : "+form);
        setSubmitted(true);
    }
    if(submitted){
        return(
            <div>
                <h2>Message sent!</h2>
                <button onClick={()=>{
                setSubmitted(false);
                setForm({name:"",email:"",message:""});
                }}>Send another</button>
            </div>
        )
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="name" value={form.name} onChange={handleChange} 
        placeholder="Enter name" />
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
      </div>
      <div>
        <input name="email" value={form.email} onChange={handleChange} 
        placeholder="Enter email" />
         {errors.email && <p style={{color:"red"}}>{errors.email}</p>}

      </div>
      <div>
        <textarea name="message" value={form.message} onChange={handleChange}
        placeholder="Enter message"  rows={5}/>
        {errors.message && <p style={{color:"red"}}>{errors.message}</p>}

      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
