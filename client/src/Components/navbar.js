import React, { useContext } from 'react';
import { AppContext } from './context';
import { Link } from 'react-router-dom';

const NavItem = ({ to, label, description }) => (
    <li className="nav-item">
        <Link className="nav-link" to={to} title={description}>{label}</Link>
    </li>
);

function NavBar() {
    const ctx = useContext(AppContext);

    const handleLogout = () => {
        // Logic for logging out here (clear user data, reset login status, etc.)
        // For example: ctx.setLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">BadBank</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarId" aria-controls="navbarId" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarId">
                <ul className="navbar-nav">
                    {/* Display navigation items */}
                    <NavItem to="/account/" label="Create Account" description="Create a new account" />
                    <NavItem to="/login/" label="Login" description="Log into your account" />
                    <NavItem to="/deposit/" label="Deposit" description="Give us your money!!" />
                    <NavItem to="/withdraw/" label="Withdraw" description="Withdraw funds" />
                    <NavItem to="/balance/" label="Balance" description="View current balance" />
                    <NavItem to="/alldata/" label="All Data" description="Oops! All your data :(" />
                </ul>
                <ul className="navbar-nav ml-auto">
                    {/* Display user's name conditionally */}
                    <li className="nav-item">
                        {ctx.LoggedIn && (
                            <span className="nav-link text-light">
                                Welcome, {ctx.Users[ctx.UserIndex]?.name || 'User'}!
                            </span>
                        )}
                    </li>
                    {/* Logout button - to be displayed when logged in */}
                    <li className="nav-item">
                        {ctx.LoggedIn && (
                            <button className="nav-link btn btn-link text-light" onClick={handleLogout}>
                                Logout
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
