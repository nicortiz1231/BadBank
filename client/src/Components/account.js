import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

function Account() {
  const { Users, setUsers } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("");

    if (!name.trim() || !email.trim() || !password) {
      setStatus("Complete every field before creating your account.");
      return;
    }

    if (password.length < 8) {
      setStatus("Use at least 8 characters for the demo password.");
      return;
    }

    if (
      Users.some(
        (user) => user.email?.toLowerCase() === email.trim().toLowerCase()
      )
    ) {
      setStatus("An account with this email already exists.");
      return;
    }

    setLoading(true);

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password,
      balance: 0,
    };

    try {
      const response = await fetch(`${API_URL}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Unable to create the account.");
      }

      const createdUser = await response.json().catch(() => newUser);

      setUsers([...Users, createdUser]);
      setCreated(true);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setStatus("");
    setCreated(false);
  }

  return (
    <section className="page-shell">
      <div className="page-container">
        <div className="page-heading">
          <span className="eyebrow">Get started</span>
          <h1>Open your BadBank account.</h1>

          <p>
            Create a demo checking account and explore the full banking
            workflow.
          </p>
        </div>

        <div className="banking-layout">
          <div className="bank-card">
            {!created ? (
              <>
                <div className="bank-card-header">
                  <h2>Create account</h2>
                  <p>Enter your details below.</p>
                </div>

                {status && <div className="status-message">{status}</div>}

                <form className="bank-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full name</label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      placeholder="Nick Ortiz"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email address</label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      placeholder="nick@example.com"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input
                      id="password"
                      type="password"
                      value={password}
                      placeholder="At least 8 characters"
                      onChange={(event) => setPassword(event.target.value)}
                    />

                    <span className="field-hint">
                      Do not use a real password.
                    </span>
                  </div>

                  <div className="security-warning">
                    <strong>Educational security warning</strong>

                    <p>
                      BadBank intentionally demonstrates insecure credential
                      handling. Never reuse a real password here.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="bank-button primary"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">✓</div>

                <h2>Account created</h2>

                <p>
                  Your demo account is ready. Continue to login and start
                  exploring the application.
                </p>

                <div className="success-actions">
                  <button
                    type="button"
                    className="bank-button secondary"
                    onClick={resetForm}
                  >
                    Create another
                  </button>

                  <Link
                    to="/login/"
                    className="bank-button primary button-link"
                  >
                    Continue to login
                  </Link>
                </div>
              </div>
            )}
          </div>

          <aside className="info-panel">
            <span className="panel-eyebrow">DEMO ACCOUNT</span>

            <h3>Built like a banking onboarding flow.</h3>

            <p>
              Create an account, authenticate, manage a balance, and then
              inspect the security weaknesses underneath the application.
            </p>

            <ul className="info-list">
              <li>MongoDB-backed account records</li>
              <li>Deposit and withdrawal functionality</li>
              <li>Portfolio-ready visual design</li>
              <li>Intentional security vulnerabilities</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Account;