import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

function Login() {
  const {
    Users,
    setUsers,
    LoggedIn,
    setLoggedIn,
    CurrentUser,
    setCurrentUser,
    UserIndex,
    setUserIndex,
    setBalance,
  } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  useEffect(() => {
    async function loadAccounts() {
      try {
        const response = await fetch(`${API_URL}/record/`);

        if (!response.ok) {
          throw new Error("Unable to connect to the account API.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setStatus(error.message);
      } finally {
        setLoadingAccounts(false);
      }
    }

    loadAccounts();
  }, [setUsers]);

  function handleLogin(event) {
    event.preventDefault();

    setStatus("");

    const index = Users.findIndex(
      (user) =>
        user.email?.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (index === -1) {
      setStatus("We couldn't match that email and password.");
      return;
    }

    const user = Users[index];

    setLoggedIn(true);
    setCurrentUser(user.email);
    setUserIndex(index);
    setBalance(Number(user.balance) || 0);
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser("");
    setUserIndex(0);
    setBalance(0);
    setEmail("");
    setPassword("");
  }

  if (LoggedIn) {
    const user =
      Users.find((record) => record.email === CurrentUser) || Users[UserIndex];

    return (
      <section className="page-shell">
        <div className="page-container">
          <div className="page-heading">
            <span className="eyebrow">Account access</span>
            <h1>You're signed in.</h1>
            <p>Continue to your banking dashboard.</p>
          </div>

          <div className="banking-layout">
            <div className="bank-card">
              <div className="signed-in-profile">
                <div className="profile-avatar">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <span className="account-label">BadBank customer</span>
                  <h2>{user?.name || "Bank User"}</h2>
                  <p>{user?.email}</p>
                </div>
              </div>

              <div className="logged-in-actions">
                <Link
                  to="/balance/"
                  className="bank-button primary button-link"
                >
                  View account overview
                </Link>

                <button
                  type="button"
                  className="bank-button secondary"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>

            <aside className="info-panel">
              <span className="panel-eyebrow">ONLINE BANKING</span>

              <h3>Your demo account is active.</h3>

              <p>
                Deposit funds, withdraw money, inspect your balance, and explore
                the security demonstration.
              </p>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="page-container">
        <div className="page-heading">
          <span className="eyebrow">Welcome back</span>
          <h1>Log in to your account.</h1>

          <p>
            Access your checking account, review your balance, and move demo
            funds.
          </p>
        </div>

        <div className="banking-layout">
          <div className="bank-card">
            <div className="bank-card-header">
              <h2>Online banking</h2>
              <p>Use the credentials from your BadBank account.</p>
            </div>

            {status && <div className="status-message">{status}</div>}

            <form className="bank-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="login-email">Email address</label>

                <input
                  id="login-email"
                  type="email"
                  value={email}
                  placeholder="nick@example.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>

                <input
                  id="login-password"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="login-form-actions">
                <Link to="/account/" className="login-help-link">
                  Need an account?
                </Link>

                <button
                  type="submit"
                  className="bank-button primary"
                  disabled={loadingAccounts}
                >
                  {loadingAccounts ? "Loading..." : "Log in"}
                </button>
              </div>
            </form>
          </div>

          <aside className="info-panel">
            <span className="panel-eyebrow">SECURITY DEMO</span>

            <h3>Intentionally insecure authentication.</h3>

            <p>
              This application compares your entered password directly with a
              stored value to demonstrate a pattern that real systems should
              never use.
            </p>

            <div className="dark-warning">
              <strong>Never use a real password.</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Login;