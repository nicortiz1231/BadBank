import React, { useContext, useState } from "react";
import Card from "./card";
import { AppContext } from "./context";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5050";

function Withdraw() {
  const {
    CurrentUser,
    LoggedIn,
    setBalance,
  } = useContext(AppContext);

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [status, setStatus] = useState("");

  async function handleWithdrawal() {
    const amount = parseFloat(withdrawAmount);

    if (!LoggedIn) {
      setStatus("You must log in before making a withdrawal.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setStatus("Please enter a valid withdrawal amount.");
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

      if (amount > currentBalance) {
        setStatus("Overdraft Protection: Insufficient funds.");
        return;
      }

      const newBalance = currentBalance - amount;

      const updateResponse = await fetch(
        `${API_URL}/record/${account._id}`,
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

      setBalance(newBalance);

      setStatus(
        `Withdrawal of $${amount.toFixed(2)} successful. New balance: $${newBalance.toFixed(2)}`
      );

      setWithdrawAmount("");
    } catch (error) {
      console.error("Withdrawal error:", error);
      setStatus(error.message);
    }
  }

  return (
    <Card
      bgcolor="warning"
      header="Withdraw"
      width="30rem"
      status={status}
      body={
        <form>
          <label htmlFor="withdrawAmount">
            Withdrawal Amount
          </label>

          <input
            id="withdrawAmount"
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            placeholder="Enter withdrawal amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />

          <br />

          <button
            type="button"
            className="btn btn-light"
            onClick={handleWithdrawal}
          >
            Withdraw
          </button>
        </form>
      }
    />
  );
}

export default Withdraw;