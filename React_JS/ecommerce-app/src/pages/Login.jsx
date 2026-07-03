import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      Login Page
    </div>
  );
}

export default Login;
