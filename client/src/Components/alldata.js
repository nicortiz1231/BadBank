import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './context.js';
import Card from './card.js';
import { simplifyText } from '../mcodeClient.js';

function AllData() {
    const ctx = useContext(AppContext);

    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/record/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
        return;
    }, [records.length]);

    const buildAccountList = () => {
        const accountArray = [];
        var key = 0;
    
        for (let record of records) {
            const { name, email, password } = record; // Destructure the record to get specific fields
            accountArray.push(
                <li key={key} className="list-group-item">
                    {simplifyText(JSON.stringify({ name, email, password }))}
                </li>
            );
            key++;
        }
    
        return accountArray;
    };
    

    return (
        <Card
            bgcolor="warning"
            header="Account Data"
            width="60rem"
            body={(
                <ul className="list-group">
                    {buildAccountList()}
                    {console.log(records)}
                </ul>
            )}
        />
    );
}

export default AllData;
