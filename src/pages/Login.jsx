import { useNavigate, useLocation } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "../components/Logo";

const Login = () => {
  const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 
    const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleSignIn = async(e) => {
    e.preventDefault();

    if(formData.email.trim() === "" || formData.password.trim() === ""){
      toast.error("Please fill in all fields");
      return;
    }

    if(formData.password.length < 6){
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
            await login({ email: formData.email, password: formData.password });
            toast.success("Welcome back! Login successful.");
            navigate(from, { replace: true }); 
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
  };

  const onChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-row min-h-screen w-full">
      {/* Left Column: Visual Sidebar Accent */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 min-h-screen items-center justify-center">
        {/* <h1 className="text-4xl font-extrabold text-white tracking-wider">ShopEasy</h1> */}
        <Logo className="[&_span]:text-white scale-125" />
      </div>

      {/* Right Column: Centered Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100 px-6 sm:px-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h1>

          <form onSubmit={handleSignIn} className="space-y-4">
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

            {/* Fixed Button Layout Container */}
            <div className="flex gap-4 items-center justify-between pt-2">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors focus:outline-none focus:shadow-outline text-center"
                type="submit"
              >
                Sign In
              </button>

              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors focus:outline-none focus:shadow-outline text-center"
                type="button"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;