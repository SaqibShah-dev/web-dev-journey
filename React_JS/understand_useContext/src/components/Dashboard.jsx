import { useContext } from "react";
import UserContext from "../context/UserContext";

const Dashboard = () => {
    const user = useContext(UserContext);
  return (
    <div>
      <h1 style={{
            background: user.theme === "dark" ? "#333" : "#fff",
            color: user.theme === "dark" ? "#fff" : "#333",
            minHeight: "100vh",
            padding: "20px"
        }}
      >User Name: {user.name}</h1>
    </div>
  );
}

export default Dashboard;
