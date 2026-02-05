import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [CurrentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("Housify")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("Housify", JSON.stringify(CurrentUser));
  }, [CurrentUser]);

  return (
    <AuthContext.Provider value={{ CurrentUser, setCurrentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
