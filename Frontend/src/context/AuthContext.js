import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
