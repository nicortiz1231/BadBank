import React, { useContext } from 'react';
import { AppContext } from './context';
import Card from './card';

function Balance() {
    const { Balance } = useContext(AppContext);

    return (
        <Card
            bgcolor="info"
            header="Balance"
            width="30rem"
            body={
                <div>
                    <h3>Current Balance: ${Balance}</h3>
                </div>
            }
        />
    );
}

export default Balance;
