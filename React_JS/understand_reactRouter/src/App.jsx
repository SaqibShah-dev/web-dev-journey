// React as a Single Page Application (SPA)
// In non-single page applications, when you click on a link in the browser, a request is 
// sent to the server before the HTML page gets rendered.


// In React, the page contents are created from our components. So what React Router does
// is intercept the request being sent to the server and then injects the contents dynamically
//   from the components we have created.

// In React, the page contents are created from our components. So what React Router does 
// is intercept the request being sent to the server and then injects the contents dynamically
//  from the components we have created.
// This is the general idea behind SPAs which allows content to be rendered faster without 
// the page being refreshed.
// When you create a new project, you'll always see an index.html file in the public folder. 
// All the code you write in your App component which acts as the root component gets rendered 
// to this HTML file. This means that there is only one HTML file where your code will be 
// rendered to.
// What happens when you have a different component you would prefer to render as a different 
// page? Do you create a new HTML file? The answer is no. React Router – like the name implies 
// – helps you route to/navigate to and render your new component in the index.html file.
// So as a single page application, when you navigate to a new component using React Router,
//  the index.html will be rewritten with the component's logic.

// Why you need React Router
// Without React Router, your entire app lives on one URL:
// http://localhost:5173/  ← everything shows here, URL never changes
// With React Router, different URLs show different "pages":
// http://localhost:5173/           → Home page
// http://localhost:5173/about      → About page
// http://localhost:5173/users      → Users list
// http://localhost:5173/users/123  → Specific user profile
// http://localhost:5173/login      → Login page
// The page never actually reloads — React Router just swaps out which component is 
// showing based on the URL.

// How to Install React Router
// To install React Router, all you have to do is run npm install react-router-dom@6 in 
// your project terminal and then wait for the installation to complete.

// If you are using yarn then use this command: yarn add react-router-dom@6.

// Core concepts — 5 things to learn
// 1. BrowserRouter  → wraps your whole app, enables routing
// 2. Routes + Route → defines which component shows for which URL
// 3. Link           → navigation without page reload
// 4. useNavigate    → programmatic navigation (after login, form submit etc.)
// 5. useParams      → read dynamic URL parameters (/users/:id)

import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import About from "./pages/About"
import Users from "./pages/Users"
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import LoginForm from "./auth/LoginForm";
import Dashboard from "./pages/Dashboard";

const App = () => {
 const location = useLocation();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>Current path: {location.pathname}</div>;
    </div>
  );
}

export default App;
