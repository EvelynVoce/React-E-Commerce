import React, { Component } from 'react';
import refreshItems from '../DynamicJS/DynamicItems'
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Get in loser, we're going shopping!</h1>
        <button type="button" onClick={refreshItems}>click me</button>
          
        <div id="container"></div>  
      </div>
    );
  }
}
