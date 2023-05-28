import React, { Component } from 'react';
import refreshItems from '../DynamicJS/DynamicItems'
import {getProducts} from "../api/products";

export class Home extends Component {
  static displayName = Home.name;

    componentDidMount() {
        refreshItems();
    }

  render () {
    return (
        <div>
            <h1 className="mb-5">Get in loser, we're going shopping!</h1>
            <div id="container" className="row row-cols-1 row-cols-md-4"></div>
        </div>
    );
  }
}


