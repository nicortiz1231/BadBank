import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

function Deposit() {
  const {
    LoggedIn,
    CurrentUser,
    Balance,
    setBalance,
  } = useContext(AppContext);

  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function refreshBalance() {
      if (!LoggedIn) return;

      try {
        const response = await fetch(`${API_URL}/record/`);
        const records = await response.json();

        const account = records.find(
          (record) => record.email === CurrentUser
        );

        if (account) {
          setBalance(Number(account.balance) || 0);
        }
      } catch (error) {
        console.error(error);
      }
    }

    refreshBalance();
  }, [LoggedIn, CurrentUser, setBalance]);

  async function handleDeposit(event) {
    event.preventDefault();

    const value = Number(amount);

    setStatus("");
    setSuccess("");

    if (!value || value <= 0) {
      setStatus("Enter a deposit amount greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/record/`);
      const records = await response.json();

      const account = records.find(
        (record) => record.email === CurrentUser
      );

      if (!account) {
        throw new Error("Unable to find your account.");
      }

      const newBalance = (Number(account.balance) || 0) + value;

      const update = await fetch(`${API_URL}/record/${account._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...account,
          balance: newBalance,
        }),
      });

      if (!update.ok) {
        throw new Error("Unable to update your balance.");
      }

      setBalance(newBalance);
      setAmount("");
      setSuccess("Deposit successful.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!LoggedIn) {
    return (
      <section className="page-shell">
        <div className="page-container narrow-page">
          <div className="auth-required-card">
            <div className="auth-lock">B</div>
            <h1>Log in to deposit funds</h1>
            <p>Sign in before making changes to your account balance.</p>

            <Link to="/login/" className="bank-button primary button-link">
              Log in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="page-container">
        <div className="page-heading">
          <span className="eyebrow">Move money</span>
          <h1>Make a deposit.</h1>

          <p>Add demo funds to your BadBank checking account.</p>
        </div>

        <div className="banking-layout">
          <div className="bank-card">
            <div className="transaction-balance">
              <span>Available balance</span>

              <strong>
                $
                {Number(Balance).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>

            <div className="bank-card-header">
              <h2>Deposit funds</h2>
              <p>Enter the amount you'd like to add.</p>
            </div>

            {status && <div className="status-message">{status}</div>}

            {success && (
              <div className="transaction-success">
                <span>✓</span>
                <div>
                  <strong>{success}</strong>
                  <p>Your account balance has been updated.</p>
                </div>
              </div>
            )}

            <form className="bank-form" onSubmit={handleDeposit}>
              <div className="form-group">
                <label htmlFor="deposit-amount">Deposit amount</label>

                <div className="money-input">
                  <span>$</span>

                  <input
                    id="deposit-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </div>
              </div>

              <div className="preset-amounts">
                {[25, 50, 100, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(String(preset))}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="bank-button primary transaction-button"
                disabled={loading}
              >
                {loading ? "Processing..." : "Deposit funds"}
              </button>
            </form>
          </div>

          <aside className="info-panel">
            <span className="panel-eyebrow">DEMO DEPOSIT</span>
            <h3>Simple account funding.</h3>

            <p>
              Deposits are persisted through your backend and reflected in your
              updated account balance.
            </p>

            <ul className="info-list">
              <li>Positive amounts only</li>
              <li>Immediate UI feedback</li>
              <li>MongoDB-backed persistence</li>
            </ul>

            <Link to="/balance/" className="sidebar-light-link">
              ← Account overview
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Deposit;