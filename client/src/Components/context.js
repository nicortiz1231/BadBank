import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [Users, setUsers] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [CurrentUser, setCurrentUser] = useState("");
  const [UserIndex, setUserIndex] = useState(0);
  const [Balance, setBalance] = useState(0);

  return (
    <AppContext.Provider
      value={{
        Users,
        setUsers,
        LoggedIn,
        setLoggedIn,
        CurrentUser,
        setCurrentUser,
        UserIndex,
        setUserIndex,
        Balance,
        setBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}