import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "./context";

function NavBar() {
  const ctx = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    isActive ? "bank-nav-link active" : "bank-nav-link";

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    ctx.setLoggedIn(false);
    ctx.setCurrentUser("");
    ctx.setUserIndex(0);
    ctx.setBalance(0);
    closeMenu();
  }

  const currentUser = ctx.Users?.[ctx.UserIndex];

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/" className="bank-brand" onClick={closeMenu}>
          <span className="brand-mark">B</span>

          <span className="brand-copy">
            <strong>BadBank</strong>
            <small>Digital Banking Demo</small>
          </span>
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`bank-nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className={navClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/deposit/" className={navClass} onClick={closeMenu}>
            Deposit
          </NavLink>

          <NavLink to="/withdraw/" className={navClass} onClick={closeMenu}>
            Withdraw
          </NavLink>

          <NavLink to="/balance/" className={navClass} onClick={closeMenu}>
            Overview
          </NavLink>

          <NavLink to="/alldata/" className={navClass} onClick={closeMenu}>
            Security Demo
          </NavLink>
        </nav>

        <div className="nav-actions">
          {ctx.LoggedIn ? (
            <>
              <div className="nav-user">
                <span className="nav-avatar">
                  {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>

                <div>
                  <small>Signed in as</small>
                  <strong>{currentUser?.name || "Bank User"}</strong>
                </div>
              </div>

              <button
                type="button"
                className="nav-login secondary"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login/"
                className="nav-login secondary"
                onClick={closeMenu}
              >
                Log in
              </Link>

              <Link
                to="/account/"
                className="nav-login primary"
                onClick={closeMenu}
              >
                Open account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;