import React, { useState } from 'react';

const defaultValue = {
    Version: "<No Context Provider>",
    setVersion: () => { },
    UserIndex: 0,
    setUserIndex: () => { },
    LoggedIn: false,
    setLoggedIn: () => { },
    CurrentUser: '',
    setCurrentUser: () => { },
    Users: {},
    setUsers: () => { },
    Balance: 0,
    setBalance: () => { },
    depositAmount: 0,
    setDepositAmount: () => { },
    withdrawAmount: 0,
    setWithdrawAmount: () => { },
};

const AppContext = React.createContext(defaultValue);

const AppContextProvider = (props) => {
    const [Version, setVersion] = useState("Version 0.0.1");
    const [LoggedIn, setLoggedIn] = useState(false);
    const [UserIndex, setUserIndex] = useState(0);
    const [CurrentUser, setCurrentUser] = useState('');
    const [Users, setUsers] = useState([]);
    const [Balance, setBalance] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);

    return (
        <AppContext.Provider
            value={{
                Version,
                setVersion,
                Users,
                setUsers,
                LoggedIn,
                setLoggedIn,
                UserIndex,
                setUserIndex,
                CurrentUser,
                setCurrentUser,
                Balance,
                setBalance,
                depositAmount,
                setDepositAmount,
                withdrawAmount,
                setWithdrawAmount,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
