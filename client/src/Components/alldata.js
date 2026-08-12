import React, { useEffect, useState } from "react";
import Card from "./card.js";

function AllData() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch("http://localhost:5050/record/");

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
  }, []);

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