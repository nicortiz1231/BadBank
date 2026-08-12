import React, { useContext, useEffect, useState } from "react";
import Card from "./card.js";
import { AppContext } from "./context.js";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5050";

function AllData() {
  const { LoggedIn } = useContext(AppContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      if (!LoggedIn) {
        setRecords([]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/record/`);

        if (!response.ok) {
          throw new Error(
            `Unable to load account data: ${response.statusText}`
          );
        }

        const records = await response.json();
        setRecords(records);
      } catch (error) {
        console.error("All Data error:", error);
      }
    }

    getRecords();
  }, [LoggedIn]);

  if (!LoggedIn) {
    return (
      <Card
        bgcolor="warning"
        header="Account Data"
        width="60rem"
        body={
          <div>
            <h5>Please log in to view account data.</h5>
          </div>
        }
      />
    );
  }

  return (
    <Card
      bgcolor="warning"
      header="Account Data"
      width="60rem"
      body={
        <ul className="list-group">
          {records.map((record) => (
            <li
              key={record._id}
              className="list-group-item"
            >
              <strong>Name:</strong> {record.name}
              <br />

              <strong>Email:</strong> {record.email}
              <br />

              <strong>Password:</strong> {record.password}
              <br />

              <strong>Balance:</strong> $
              {(Number(record.balance) || 0).toFixed(2)}
            </li>
          ))}
        </ul>
      }
    />
  );
}

export default AllData;