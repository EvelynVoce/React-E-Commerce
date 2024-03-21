import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {login} from "../api/account";

interface LoginFormProps {
    onLogin: (loggedInUsername: string, userId: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const history = useHistory();
    
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const userId = await login(username, password);

        if (userId) {
            onLogin(username, userId);
            history.push('/');
        }
        else {
            setError("invalid login details");
        }
    };

    const handleSignup = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        history.push('/signup');
    };

    return (
        <div className="content">
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

                <button type="submit" className="my-3 rounded-pill purchase-link">Login</button>
                <button className="my-3 rounded-pill purchase-link" onClick={handleSignup}> Create an Account</button>
            </form>
        </div>
    );
}

export default LoginForm;