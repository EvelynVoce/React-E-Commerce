import React from 'react';
import { Container, Navbar, NavbarBrand, Nav } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import './NavMenu.css';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavMenu = () => {
  const history = useHistory();

  const handleIconClick = () => {
    history.push('/login');
  };


  return (
      <header>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarBrand href="/">Shop</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <FontAwesomeIcon
                  icon={faUser}
                  style={{color: 'white', cursor: 'pointer' }}
                  onClick={handleIconClick}
              />
            </Nav>
          </Container>
        </Navbar>
      </header>
  );
}

export default NavMenu;
