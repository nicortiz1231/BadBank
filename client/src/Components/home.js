import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-copy">
            <span className="eyebrow">Modern banking. Bad security.</span>

            <h1>
              Take control of
              <span>your demo money.</span>
            </h1>

            <p className="hero-description">
              BadBank is a full-stack banking application built to demonstrate
              everyday banking workflows while exposing the security mistakes
              real applications must avoid.
            </p>

            <div className="hero-actions">
              <Link to="/account/" className="button button-primary">
                Open an account
                <span>→</span>
              </Link>

              <Link to="/login/" className="button button-secondary">
                Log in
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-icon">✓</div>

              <div>
                <strong>Designed for demonstration.</strong>
                <span>
                  Never enter real passwords or financial information.
                </span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-topbar">
                <div>
                  <small>Good afternoon</small>
                  <strong>Portfolio User</strong>
                </div>

                <span className="preview-avatar">PU</span>
              </div>

              <div className="preview-balance-card">
                <small>Available balance</small>
                <h2>$12,480.50</h2>

                <div className="preview-account-row">
                  <span>BadBank Checking</span>
                  <span>•••• 4821</span>
                </div>
              </div>

              <div className="preview-actions">
                <div>
                  <span>↓</span>
                  <small>Deposit</small>
                </div>

                <div>
                  <span>↑</span>
                  <small>Withdraw</small>
                </div>

                <div>
                  <span>↔</span>
                  <small>Transfer</small>
                </div>
              </div>

              <div className="preview-activity">
                <div className="preview-section-heading">
                  <strong>Recent activity</strong>
                  <span>View all</span>
                </div>

                <div className="activity-row">
                  <span className="activity-logo">P</span>
                  <div>
                    <strong>Payroll deposit</strong>
                    <small>Today</small>
                  </div>
                  <strong className="positive">+$2,400.00</strong>
                </div>

                <div className="activity-row">
                  <span className="activity-logo">C</span>
                  <div>
                    <strong>Card payment</strong>
                    <small>Yesterday</small>
                  </div>
                  <strong>-$84.19</strong>
                </div>

                <div className="activity-row">
                  <span className="activity-logo">T</span>
                  <div>
                    <strong>Transfer</strong>
                    <small>Aug 08</small>
                  </div>
                  <strong>-$250.00</strong>
                </div>
              </div>
            </div>

            <div className="floating-security-card">
              <span className="floating-icon">!</span>

              <div>
                <strong>Security matters</strong>
                <small>
                  Explore the intentionally vulnerable implementation.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="content-container">
          <div className="section-heading">
            <span className="eyebrow">Built for the portfolio</span>
            <h2>A banking demo that looks like a real product.</h2>

            <p>
              Clean visual hierarchy, modern financial UI patterns, and a clear
              explanation of the security concepts behind the project.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-icon">◎</span>

              <h3>Account management</h3>

              <p>
                Create a customer profile, log in, and manage a persistent
                account through the application backend.
              </p>

              <Link to="/account/">Create account →</Link>
            </article>

            <article className="feature-card">
              <span className="feature-icon">↕</span>

              <h3>Move your money</h3>

              <p>
                Deposit and withdraw demo funds with clear validation and
                immediate account balance updates.
              </p>

              <Link to="/deposit/">Make a deposit →</Link>
            </article>

            <article className="feature-card danger-feature">
              <span className="feature-icon">!</span>

              <h3>See what makes it bad</h3>

              <p>
                Inspect the intentionally insecure account data and understand
                why hashing, authentication, and authorization matter.
              </p>

              <Link to="/alldata/">Security demo →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="security-story-section">
        <div className="content-container security-story-grid">
          <div>
            <span className="eyebrow">Why BadBank?</span>
            <h2>Good design does not equal good security.</h2>
          </div>

          <div className="security-story-copy">
            <p>
              A real financial application should never expose credentials or
              unrestricted account records. BadBank deliberately demonstrates
              those mistakes so the consequences are easy to understand.
            </p>

            <p>
              The polished interface represents what customers expect from
              modern banking software. The intentionally insecure architecture
              underneath it demonstrates why appearance alone proves nothing
              about application security.
            </p>

            <Link to="/alldata/" className="text-link">
              Explore the security demonstration →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;