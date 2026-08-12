import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

function Balance() {
  const {
    LoggedIn,
    CurrentUser,
    Balance,
    setBalance,
  } = useContext(AppContext);

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadAccount() {
      if (!LoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/record/`);

        if (!response.ok) {
          throw new Error("Unable to retrieve your account.");
        }

        const records = await response.json();

        const current = records.find(
          (record) => record.email === CurrentUser
        );

        if (!current) {
          throw new Error("Unable to find the logged-in account.");
        }

        setAccount(current);
        setBalance(Number(current.balance) || 0);
      } catch (error) {
        setStatus(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [LoggedIn, CurrentUser, setBalance]);

  if (!LoggedIn) {
    return (
      <section className="page-shell">
        <div className="page-container narrow-page">
          <div className="auth-required-card">
            <div className="auth-lock">B</div>

            <h1>Log in to view your account</h1>

            <p>
              Your account overview becomes available after authentication.
            </p>

            <Link to="/login/" className="bank-button primary button-link">
              Log in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell dashboard-page">
      <div className="page-container">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Account overview</span>

            <h1>
              Welcome back
              {account?.name ? `, ${account.name.split(" ")[0]}` : ""}.
            </h1>

            <p>Here's a quick look at your BadBank checking account.</p>
          </div>

          <span className="dashboard-header-badge">
            <span className="status-dot" />
            Account active
          </span>
        </div>

        {status && <div className="status-message">{status}</div>}

        {loading ? (
          <div className="bank-card">Loading your account...</div>
        ) : (
          <>
            <div className="dashboard-grid">
              <section className="balance-hero-card">
                <div className="balance-card-top">
                  <div>
                    <span>BadBank Checking</span>
                    <small>Primary account</small>
                  </div>

                  <span className="account-chip">BB</span>
                </div>

                <div className="balance-main">
                  <small>Available balance</small>

                  <h2>
                    $
                    {Number(Balance).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h2>
                </div>

                <div className="balance-footer">
                  <span>Account holder</span>
                  <strong>{account?.name}</strong>
                </div>
              </section>

              <section className="quick-actions-card">
                <div className="dashboard-card-heading">
                  <div>
                    <span className="account-label">Quick actions</span>
                    <h2>Move money</h2>
                  </div>
                </div>

                <div className="quick-action-grid">
                  <Link to="/deposit/" className="quick-action">
                    <span className="quick-action-icon">↓</span>
                    <div>
                      <strong>Deposit</strong>
                      <small>Add money</small>
                    </div>
                  </Link>

                  <Link to="/withdraw/" className="quick-action">
                    <span className="quick-action-icon">↑</span>
                    <div>
                      <strong>Withdraw</strong>
                      <small>Take money out</small>
                    </div>
                  </Link>

                  <Link to="/alldata/" className="quick-action">
                    <span className="quick-action-icon">!</span>
                    <div>
                      <strong>Security demo</strong>
                      <small>Inspect the bad part</small>
                    </div>
                  </Link>
                </div>
              </section>
            </div>

            <div className="dashboard-secondary-grid">
              <section className="bank-card">
                <div className="dashboard-card-heading">
                  <div>
                    <span className="account-label">Account information</span>
                    <h2>Checking details</h2>
                  </div>
                </div>

                <div className="account-detail-list">
                  <div>
                    <span>Account holder</span>
                    <strong>{account?.name}</strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>{account?.email}</strong>
                  </div>

                  <div>
                    <span>Account type</span>
                    <strong>BadBank Checking</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong className="account-status-value">Active</strong>
                  </div>
                </div>
              </section>

              <section className="security-summary-card">
                <span className="account-label">Security lesson</span>

                <h2>Looks secure. Isn't secure.</h2>

                <p>
                  The interface resembles modern banking software while the
                  implementation deliberately exposes unsafe credential
                  handling.
                </p>

                <Link to="/alldata/">Explore the security demo →</Link>
              </section>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Balance;