import { createContext } from "react";

// Creates a "channel" that components can subscribe to
const UserContext = createContext(null);

export default UserContext;