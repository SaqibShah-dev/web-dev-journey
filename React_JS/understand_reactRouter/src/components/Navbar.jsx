// import { Link } from "react-router-dom";

// function Navbar() {
//     return (
//         <nav style={{
//             display: "flex",
//             gap: "20px",
//             padding: "10px",
//             background: "#333"
//         }}>
//             <Link to="/" style={{ color: "white" }}>Home</Link>
//             <Link to="/about" style={{ color: "white" }}>About</Link>
//             <Link to="/users" style={{ color: "white" }}>Users</Link>
//         </nav>
//     );
// }

// export default Navbar;


//  NavLink — active link styling
// NavLink is like Link but automatically adds an active class when its URL matches the 
// current page:

import { NavLink } from "react-router-dom";

function Navbar() {
    const linkStyle = ({ isActive }) => ({
        color: isActive ? "yellow" : "white",
        fontWeight: isActive ? "bold" : "normal",
        textDecoration: "none"
    });

    return (
        <nav style={{
            display: "flex",
            gap: "20px",
            padding: "10px",
            background: "#333"
        }}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/about" style={linkStyle}>About</NavLink>
            <NavLink to="/users" style={linkStyle}>Users</NavLink>
            <NavLink to="/login" style={linkStyle}>Login</NavLink>
            <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        </nav>
    );
}

export default Navbar;

// isActive is automatically true when you're on that page — perfect for highlighting 
// the current nav item.