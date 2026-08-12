import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

function Withdraw() {
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

  async function handleWithdraw(event) {
    event.preventDefault();

    const value = Number(amount);

    setStatus("");
    setSuccess("");

    if (!value || value <= 0) {
      setStatus("Enter a withdrawal amount greater than zero.");
      return;
    }

    if (value > Number(Balance)) {
      setStatus("That amount exceeds your available balance.");
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

      const currentBalance = Number(account.balance) || 0;

      if (value > currentBalance) {
        throw new Error("Insufficient funds.");
      }

      const newBalance = currentBalance - value;

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
      setSuccess("Withdrawal successful.");
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

            <h1>Log in to withdraw funds</h1>

            <p>
              Your current demo balance will be checked before any update.
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
    <section className="page-shell">
      <div className="page-container">
        <div className="page-heading">
          <span className="eyebrow">Move money</span>
          <h1>Make a withdrawal.</h1>

          <p>Remove demo funds while preventing overdrafts.</p>
        </div>

        <div className="banking-layout">
          <div className="bank-card">
            <div className="transaction-balance">
              <span>Available to withdraw</span>

              <strong>
                $
                {Number(Balance).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>

            <div className="bank-card-header">
              <h2>Withdrawal amount</h2>
              <p>Enter the amount you'd like to remove.</p>
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

            <form className="bank-form" onSubmit={handleWithdraw}>
              <div className="form-group">
                <label htmlFor="withdraw-amount">Withdrawal amount</label>

                <div className="money-input">
                  <span>$</span>

                  <input
                    id="withdraw-amount"
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
                {[20, 50, 100, 200].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    disabled={preset > Number(Balance)}
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
                {loading ? "Processing..." : "Withdraw funds"}
              </button>
            </form>
          </div>

          <aside className="info-panel">
            <span className="panel-eyebrow">BUILT-IN VALIDATION</span>

            <h3>No accidental overdrafts.</h3>

            <p>
              The UI validates positive amounts and your available balance
              before sending an update to the API.
            </p>

            <ul className="info-list">
              <li>Positive amounts only</li>
              <li>Balance checked before update</li>
              <li>Clear success and error feedback</li>
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

export default Withdraw;