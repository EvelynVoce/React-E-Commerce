import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import ViewItem from "./components/ViewItem";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/products/:productName' component={ViewItem} />
      </Layout>
    );
  }
}
