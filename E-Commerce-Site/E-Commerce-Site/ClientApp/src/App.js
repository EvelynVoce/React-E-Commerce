import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import ViewItem from "./components/ViewItem";
import SignupForm from "./forms/SignupForm";
import LoginForm from "./forms/LoginForm";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/products/:productName' component={ViewItem} />
        <Route exact path='/signup' component={SignupForm} />
          <Route exact path='/login' component={LoginForm} />
      </Layout>
    );
  }
}
