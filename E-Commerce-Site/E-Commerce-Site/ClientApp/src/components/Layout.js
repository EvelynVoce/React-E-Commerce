import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    const { username, userId } = this.props;
    
    return (
      <div>
        <NavMenu username={username} userId={userId}/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
