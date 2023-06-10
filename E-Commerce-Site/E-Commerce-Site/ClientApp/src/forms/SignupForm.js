import React, { useState } from 'react';
import {addUser} from "../api/account";

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
        addUser(username, password);
        
    };

    return (
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
    );
}
