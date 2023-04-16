// AuthContext.js
import { createContext } from "react";

const AuthContext = createContext({
  userRole: null,
  setUserRole: () => {},
  accessToken: null,
  setAccessToken: () => {},
});

export default AuthContext;