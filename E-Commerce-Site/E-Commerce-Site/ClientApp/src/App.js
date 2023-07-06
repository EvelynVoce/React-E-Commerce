import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import './custom.css'
import ViewItem from "./components/ViewItem";
import SignupForm from "./forms/SignupForm";
import LoginForm from "./forms/LoginForm";
import ViewCart from "./components/ViewCart";

const App = () => {
    const [username, setUsername] = useState('');
    const [userID, setID] = useState('');

    const handleLogin = (loggedInUsername, userId) => {
        setUsername(loggedInUsername);
        setID(userId);
    };
    
    return (
      <Layout username={username} userId={userID}>

        <Route exact path='/'>
            <Home/>
        </Route>
          
        <Route exact path='/products/:productName'>
            <ViewItem userId={userID}/>
        </Route>
        <Route exact path='/signup' component={SignupForm} />
        <Route exact path='/login'>
            <LoginForm onLogin={handleLogin}/>
        </Route>

        <Route exact path='/viewCart'>
            <ViewCart userId={userID}/>
        </Route>  
      </Layout>
    );
}

export default App;