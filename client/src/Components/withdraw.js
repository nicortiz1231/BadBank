import React, { useContext, useState } from 'react';
import Card from './card';
import { AppContext } from './context';

function Withdraw() {
    const { Balance, setBalance } = useContext(AppContext);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleWithdrawal = () => {
        const amount = parseFloat(withdrawAmount);
        if (isNaN(amount) || amount <= 0) {
            setStatus('Please enter a valid withdrawal amount.');
            return;
        }

        if (amount > Balance) {
            setStatus('Overdraft Protection: Insufficient funds.');
            return;
        }

        setBalance(prevBalance => prevBalance - amount);
        setStatus(`Withdrawal of $${amount} successful.`);
        setWithdrawAmount('');
    };

    return (
        <Card
            bgcolor="warning"
            header="Withdraw"
            width="30rem"
            status={status}
            body={
                <form>
                    Withdraw<br />
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter withdrawal amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                    /><br />

                    {status && status.includes('Insufficient') && (
                        <div className="alert alert-danger">
                            {status}
                        </div>
                    )}

                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleWithdrawal}
                        disabled={status.includes('Insufficient')}
                    >
                        Withdraw
                    </button>
                    <br />
                </form>
            }
        />
    );
}

export default Withdraw;
