import { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate , useLocation} from "react-router-dom"; 
import toast from "react-hot-toast";
import Logo from '../components/Logo';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const from = location.state?.from?.pathname || "/";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  console.log(from.state?.from?.pathname);

  const onChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    
    // Validation Checks
    if (formData.email.trim() === "" || formData.password.trim() === "" || formData.name.trim() === "" || formData.confirmPassword.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // 3. Pass name, email, and password to Auth Context
    try {
        await register({ name: formData.name, email: formData.email, password: formData.password });
        toast.success("Registration successful!");
         navigate(from, { replace: true }); 
    } catch (error) {
        toast.error(error.message || "Registration failed.");
    }
  };

  return (
    <div className="flex flex-row min-h-screen w-full">
      {/* Left Column: Visual Sidebar Accent */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 min-h-screen items-center justify-center">
        <Logo className="[&_span]:text-white scale-125" />
      </div>

      {/* Right Column: Centered Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100 px-6 sm:px-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="name"
                type="text"
                required
                placeholder="Name"
                value={formData.name}
                onChange={(e) => onChange(e.target.value, "name")}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="email"
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => onChange(e.target.value, "email")}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) => onChange(e.target.value, "password")}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => onChange(e.target.value, "confirmPassword")}
              />
            </div>

            {/* Action Buttons Container */}
            <div className="flex gap-4 items-center justify-between pt-2">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors focus:outline-none focus:shadow-outline text-center"
                type="submit"
              >
                Register
              </button>

              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors focus:outline-none focus:shadow-outline text-center"
                type="button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;