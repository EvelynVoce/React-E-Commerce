import React, { useState } from 'react';
import {addUser, availableUsername} from "../api/account";
import {useHistory} from "react-router-dom";

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();
    
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (await availableUsername(username)) {
            await addUser(username, password);
            history.push('/');
        }
        else {
            setError("Username is Already Taken");
        }
    };

    return (
        <div className="content">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <label> Username: </label>
                <input
                    type="text"
                    className="form-field"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
    
                <label> Password: </label>
                <input
                    type="password"
                    className="form-field"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
    
                <button type="submit" className="my-3 rounded-pill purchase-link">Register</button>
            </form>
        </div>
    );
}
