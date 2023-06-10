import React, { Component } from 'react';
import {getProducts} from "../api/products";
import ProductCards from "./ProductCards";


export class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
          jsonData: [],
      };
  }
    
  static displayName = Home.name;

  async componentDidMount() {
      const data = await getProducts();
      this.setState({ jsonData: data });
  }

  render () {
    const { jsonData } = this.state;    
    
    return (
        <div>
            <h1 className="mb-5 my-3">Get in loser, we're going shopping!</h1>
            <ProductCards data={jsonData} />
        </div>
    );
  }
}


