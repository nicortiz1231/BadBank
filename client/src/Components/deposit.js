import React, { useContext, useState } from 'react';
import Card from './card';
import { AppContext } from './context';

function Deposit() {
    const { setBalance } = useContext(AppContext);
    const [depositAmount, setDepositAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleDeposit = () => {
        const amount = parseFloat(depositAmount);
        if (isNaN(amount) || amount < 0) {
            setStatus('Cannot enter negative amounts.');
            return;
        }

        setBalance(prevBalance => prevBalance + amount);
        setStatus(`Deposit of $${amount} successful.`);
        setDepositAmount('');
    };

    return (
        <Card
            bgcolor="success"
            header="Deposit"
            width="30rem"
            status={status}
            body={
                <form>
                    Deposit<br />
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter deposit amount"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                    /><br />

                    {status && status.includes('negative') && (
                        <div className="alert alert-danger">
                            {status}
                        </div>
                    )}

                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleDeposit}
                        disabled={status.includes('negative')}
                    >
                        Deposit
                    </button>
                    <br />
                </form>
            }
        />
    );
}

export default Deposit;
