import React, { Component } from 'react';
import refreshItems from '../DynamicJS/DynamicItems'

export class Home extends Component {
  static displayName = Home.name;

    componentDidMount() {
        refreshItems();
    }

  render () {
    return (
        <div>
            <h1>Get in loser, we're going shopping!</h1>
            <div id="container" className="row row-cols-1 row-cols-md-5"></div>
        </div>
    );
  }
}


