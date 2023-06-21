import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    const { username } = this.props;
    
    return (
      <div>
        <NavMenu username={username} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
