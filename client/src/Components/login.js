import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './context';
import Card from './card';

const TIMEOUT_MSEC = 3000;

function Login() {
    const [cleared, setCleared] = useState(false);
    const [needInput, setNeedInput] = useState(true);
    const [status, setStatus] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const ctx = useContext(AppContext);

    function validate(field, label) {
        if (!field) {
            setStatus(`Error: ${label} is required`);
            setTimeout(() => setStatus(''), TIMEOUT_MSEC);
            setSubmitDisabled('Disabled');
            return false;
        }

        if (label === "email") {
            var emailExists = false;
            for (let i = 0; i < records.length; i++) {
                console.log(records[i])
                if (records[i].email === field) {
                    emailExists = true;
                    break;
                }
            }
            if (!emailExists) {
                setStatus(`Error: The supplied email has no Account.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmitDisabled('Disabled');
                return false;
            }
        }

        return true;
    }

    function checkFields() {
        setSubmitDisabled('Disabled');

        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;

        setSubmitDisabled('');

        return true;
    }

    function clearForm() {
        setEmail('');
        setPassword('');

        setSubmitDisabled('Disabled');
        setNeedInput(true);
    }

    function clearForm_Click() {
        clearForm();
        setNeedInput(true);
    }

    function logIn_Click() {
        console.log("Login:", email, password);

        if (!checkFields()) {
            return;
        }

        var loginSuccess = false;
        for (let i = 0; i < records.length; i++) {
            if (records[i].email === email) {
                if (records[i].password === password) {
                    loginSuccess = true;

                    ctx.LoggedIn = true;
                    ctx.CurrentUser = email;
                    ctx.UserIndex = i;

                    break;
                }
            }
        }
        if (!loginSuccess) {
            setStatus(`Error: Login failed, check email and password.`);
            setTimeout(() => setStatus(''), TIMEOUT_MSEC);
            setSubmitDisabled('Disabled');
            return false;
        }

        setNeedInput(false);
    }

    function logOut_Click() {
        console.log("Logout:", email, password);

        ctx.LoggedIn = false;
        ctx.CurrentUser = 'You must log in...';
        ctx.UserIndex = 0;

        setNeedInput(true);
    }

    if (!cleared) {
        clearForm();
        setCleared(true);

        setNeedInput(!ctx.LoggedIn);
    }

    return (
        <Card
            bgcolor="secondary"
            header="Login"
            width="30rem"
            status={status}
            body={needInput ? (
                <form>
                    Email Address<br />
                    <input type="email" autoComplete="new-password" required={true} className="form-control" id="email"
                        placeholder="Enter email" value={email} onChange={e => {
                            setSubmitDisabled('');
                            setEmail(e.currentTarget.value);
                            validate(e.currentTarget.value, 'email');
                        }} /><br />

                    Password<br />
                    <input type="password" autoComplete="new-password" required={true} className="form-control" id="password"
                        placeholder="Enter password" value={password} onChange={e => {
                            setSubmitDisabled('');
                            setPassword(e.currentTarget.value);
                            validate(e.currentTarget.value, 'password');
                        }} /><br />

                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={logIn_Click} disabled={submitDisabled}>Log In</button>
                    <br />
                </form>
            ) : (
                <>
                    <h5>{ctx.CurrentUser} is logged in.</h5>
                    <br />
                    <button type="submit" className="btn btn-light" onClick={logOut_Click}>Log Out</button>
                </>
            )}
        />
    );
}

export default Login;
