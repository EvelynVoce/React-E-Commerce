import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
    };

    const handleSignup = (event) => {
        event.preventDefault();
        history.push('/signup');
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
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

            <button type="submit" className="my-3 rounded-pill purchase-link">Login</button>
            <button className="my-3 rounded-pill purchase-link" onClick={handleSignup}> Create an Account</button>
        </form>
    );
}
