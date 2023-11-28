import React, { useContext, useState } from 'react';
import { AppContext } from './context';
import Card from './card';

const TIMEOUT_MSEC = 3000;
const MINIMUM_PASSWORD_LENGTH = 8;

function Account() {
    const [cleared, setCleared] = useState(false);
    const [needInput, setNeedInput] = useState(true);
    const [status, setStatus] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const ctx = useContext(AppContext);

    async function onSubmit(e) {
        e.preventDefault();

        if (!checkFields()) {
            return;
        }

        ctx.Users.push({ name, email, password });

        const newPerson = { name, email, password };

        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setNeedInput(false);
    }

    function validate(field, label) {
        if (!field) {
            setStatus(`Error: ${label} is required`);
            setTimeout(() => setStatus(''), TIMEOUT_MSEC);
            setSubmitDisabled('Disabled');
            return false;
        }

        if (label === "email") {
            var emailInUse = false;
            for (let i = 0; i < ctx.Users.length; i++) {
                if (ctx.Users[i].email === field) {
                    emailInUse = true;
                    break;
                }
            }
            if (emailInUse) {
                setStatus(`Error: The supplied email is already in use.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmitDisabled('Disabled');
                return false;
            }
        }

        if (label === "password") {
            if (field.length < MINIMUM_PASSWORD_LENGTH) {
                setStatus(`Error: Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmitDisabled('Disabled');
                return false;
            }
        }

        return true;
    }

    function checkFields() {
        setSubmitDisabled('Disabled');

        if (!validate(name, 'name')) return false;
        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;

        setSubmitDisabled('');

        return true;
    }

    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');

        setSubmitDisabled('Disabled');
    };

    function clearForm_Click() {
        clearForm();
        setNeedInput(true);
    }

    function createAccount_Click() {
        if (!checkFields()) {
            return;
        }

        ctx.Users.push({ name, email, password });

        setNeedInput(false);
    }

    if (!cleared) {
        clearForm();
        setCleared(true);
    }

    return (
        <Card
            bgcolor="primary"
            header="Account"
            width="30rem"
            status={status}
            body={needInput ? (
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label><br />
                        <input
                            type="input"
                            autoComplete="new-password"
                            required={true}
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => {
                                setSubmitDisabled('');
                                setName(e.currentTarget.value);
                                validate(e.currentTarget.value, 'name');
                            }}
                            className="form-control" // Ensure Bootstrap styles are applied
                        /><br />
                        <label htmlFor="email">Email Address</label><br />
                        <input
                            type="email"
                            autoComplete="new-password"
                            required={true}
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {
                                setSubmitDisabled('');
                                setEmail(e.currentTarget.value);
                                validate(e.currentTarget.value, 'email');
                            }}
                            className="form-control" // Ensure Bootstrap styles are applied
                        /><br />
                        <label htmlFor="password">Password</label><br />
                        <input
                            type="password"
                            autoComplete="new-password"
                            required={true}
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setSubmitDisabled('');
                                setPassword(e.currentTarget.value);
                                validate(e.currentTarget.value, 'password');
                            }}
                            className="form-control" // Ensure Bootstrap styles are applied
                        /><br />
                    </div>
                    <div>
                        <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                        <> </>
                        <button type="submit" className="btn btn-light" disabled={submitDisabled}>Create</button>
                        <br />
                    </div>
                </form>
            ) : (
                <>
                    <h5>Success</h5>
                    <br />
                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Add another account</button>
                </>
            )}
        />
    );
}

export default Account;
