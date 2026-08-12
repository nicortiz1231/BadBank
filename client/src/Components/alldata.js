import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

function AllData() {
  const { LoggedIn } = useContext(AppContext);

  const [records, setRecords] = useState([]);
  const [revealed, setRevealed] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadRecords() {
      if (!LoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/record/`);

        if (!response.ok) {
          throw new Error("Unable to retrieve account records.");
        }

        const data = await response.json();
        setRecords(data);
      } catch (error) {
        setStatus(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadRecords();
  }, [LoggedIn]);

  function togglePassword(id) {
    setRevealed((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  if (!LoggedIn) {
    return (
      <section className="page-shell">
        <div className="page-container narrow-page">
          <div className="auth-required-card">
            <div className="auth-lock">!</div>

            <h1>Security demo locked</h1>

            <p>
              Log in first to inspect the intentionally insecure account
              records.
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
    <section className="page-shell security-page">
      <div className="page-container">
        <div className="security-demo-header">
          <div>
            <span className="eyebrow">Security demonstration</span>
            <h1>This is what makes BadBank bad.</h1>

            <p>
              A polished frontend does not mean an application is secure.
              These account records intentionally expose information that
              should never be returned like this in production.
            </p>
          </div>

          <span className="security-risk-badge">
            <span>!</span>
            Intentionally insecure
          </span>
        </div>

        <div className="security-alert">
          <div className="security-alert-icon">!</div>

          <div>
            <strong>
              Passwords should never be stored or exposed as plain text.
            </strong>

            <p>
              Real applications should use secure password hashing,
              authorization controls, sessions, and restricted API responses.
            </p>
          </div>
        </div>

        {status && <div className="status-message">{status}</div>}

        <section className="security-table-card">
          <div className="security-table-heading">
            <div>
              <span className="account-label">Database exposure demo</span>
              <h2>User account records</h2>
            </div>

            <span className="record-count">
              {records.length} {records.length === 1 ? "record" : "records"}
            </span>
          </div>

          {loading ? (
            <div className="table-loading">Loading records...</div>
          ) : (
            <div className="security-table-wrapper">
              <table className="security-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Balance</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr key={record._id || record.email}>
                      <td>
                        <div className="table-user">
                          <span className="table-avatar">
                            {record.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>

                          <strong>{record.name}</strong>
                        </div>
                      </td>

                      <td>{record.email}</td>

                      <td>
                        <div className="password-cell">
                          <code>
                            {revealed[record._id || record.email]
                              ? record.password
                              : "••••••••"}
                          </code>

                          <button
                            type="button"
                            onClick={() =>
                              togglePassword(record._id || record.email)
                            }
                          >
                            {revealed[record._id || record.email]
                              ? "Hide"
                              : "Reveal"}
                          </button>
                        </div>
                      </td>

                      <td className="table-balance">
                        $
                        {(Number(record.balance) || 0).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="security-lessons">
          <article>
            <span>01</span>
            <h3>Hash passwords</h3>
            <p>
              Passwords should be processed through a secure one-way password
              hashing function before storage.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Restrict account data</h3>
            <p>
              Users and APIs should only be able to access data they are
              explicitly authorized to see.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Authenticate properly</h3>
            <p>
              Production systems require proper sessions, authorization,
              auditing, and secure authentication controls.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default AllData;