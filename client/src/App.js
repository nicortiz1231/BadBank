import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './Components/context';
import NavBar from './Components/navbar';
import Account from './Components/account';
import AllData from './Components/alldata';
import Deposit from './Components/deposit';
import Home from './Components/home';
import Login from './Components/login';
import Withdraw from './Components/withdraw';
import Balance from './Components/balance'; // Import the Balance component
import './App.css';

function App() {
    return (
        <AppContextProvider> {/* Wrap everything inside the AppContextProvider */}
            <HashRouter>
                <NavBar />
                <div className="container" style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/account/" element={<Account />} />
                        <Route path="/login/" element={<Login />} />
                        <Route path="/deposit/" element={<Deposit />} />
                        <Route path="/withdraw/" element={<Withdraw />} />
                        <Route path="/alldata/" element={<AllData />} />
                        <Route path="/balance/" element={<Balance />} /> {/* Route for the Balance component */}
                    </Routes>
                </div>
            </HashRouter>
        </AppContextProvider>
    );
}

export default App;
