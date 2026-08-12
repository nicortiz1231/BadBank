import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";
import Card from "./card";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5050";

function Balance() {
  const {
    Balance,
    setBalance,
    CurrentUser,
    LoggedIn,
  } = useContext(AppContext);

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadBalance() {
      if (!LoggedIn) {
        setStatus("You must log in to view your balance.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/record/`);

        if (!response.ok) {
          throw new Error("Unable to retrieve account information.");
        }

        const accounts = await response.json();

        const account = accounts.find(
          (user) => user.email === CurrentUser
        );

        if (!account) {
          throw new Error("Logged-in account could not be found.");
        }

        const currentBalance = Number(account.balance) || 0;

        setBalance(currentBalance);
        setStatus("");
      } catch (error) {
        console.error("Balance error:", error);
        setStatus(error.message);
      }
    }

    loadBalance();
  }, [CurrentUser, LoggedIn, setBalance]);

  return (
    <Card
      bgcolor="info"
      header="Balance"
      width="30rem"
      status={status}
      body={
        <div>
          {LoggedIn ? (
            <h3>Current Balance: ${Balance.toFixed(2)}</h3>
          ) : (
            <p>Please log in to view your balance.</p>
          )}
        </div>
      }
    />
  );
}

export default Balance;