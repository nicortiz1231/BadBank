import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { AppContextProvider } from "./Components/context";
import NavBar from "./Components/navbar";
import Home from "./Components/home";
import Account from "./Components/account";
import Login from "./Components/login";
import Balance from "./Components/balance";
import Deposit from "./Components/deposit";
import Withdraw from "./Components/withdraw";
import AllData from "./Components/alldata";

import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <HashRouter>
        <div className="app-shell">
          <NavBar />

          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account/" element={<Account />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/balance/" element={<Balance />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              <Route path="/alldata/" element={<AllData />} />
            </Routes>
          </main>

          <footer className="site-footer">
            <div className="footer-inner">
              <div>
                <div className="footer-brand">
                  <span className="brand-mark">B</span>
                  <span>BadBank</span>
                </div>

                <p>
                  A full-stack banking demo built to explore authentication,
                  data storage, and application security.
                </p>
              </div>

              <div className="footer-note">
                <span className="footer-pill">Portfolio Project</span>
                <p>Educational use only. Never enter real credentials.</p>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;