import React, { useContext, useState } from "react";
import Card from "./card";
import { AppContext } from "./context";

function Deposit() {
  const {
    CurrentUser,
    LoggedIn,
    setBalance,
  } = useContext(AppContext);

  const [depositAmount, setDepositAmount] = useState("");
  const [status, setStatus] = useState("");

  async function handleDeposit() {
    const amount = parseFloat(depositAmount);

    if (!LoggedIn) {
      setStatus("You must log in before making a deposit.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setStatus("Please enter a deposit amount greater than zero.");
      return;
    }

    try {
      // Get all accounts from the backend
      const response = await fetch("http://localhost:5050/record/");

      if (!response.ok) {
        throw new Error("Unable to retrieve account information.");
      }

      const accounts = await response.json();

      // Find the currently logged-in account by email
      const account = accounts.find(
        (user) => user.email === CurrentUser
      );

      if (!account) {
        throw new Error("Logged-in account could not be found.");
      }

      const currentBalance = Number(account.balance) || 0;
      const newBalance = currentBalance + amount;

      // Update the account in MongoDB
      const updateResponse = await fetch(
        `http://localhost:5050/record/${account._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: account.name,
            email: account.email,
            password: account.password,
            balance: newBalance,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Unable to update account balance.");
      }

      // Update React state so the UI reflects the new balance immediately
      setBalance(newBalance);

      setStatus(
        `Deposit of $${amount.toFixed(2)} successful. New balance: $${newBalance.toFixed(2)}`
      );

      setDepositAmount("");
    } catch (error) {
      console.error("Deposit error:", error);
      setStatus(error.message);
    }
  }

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      width="30rem"
      status={status}
      body={
        <form>
          <label htmlFor="depositAmount">
            Deposit Amount
          </label>

          <input
            id="depositAmount"
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            placeholder="Enter deposit amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />

          <br />

          <button
            type="button"
            className="btn btn-light"
            onClick={handleDeposit}
          >
            Deposit
          </button>
        </form>
      }
    />
  );
}

export default Deposit;