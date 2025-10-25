import { useState } from "react";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ showLogin , setShowLogin ] = useState(false);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
