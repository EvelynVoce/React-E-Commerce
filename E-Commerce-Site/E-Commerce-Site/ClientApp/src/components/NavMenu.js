import React, {useState} from 'react';
import { Container, Navbar, NavbarBrand, Nav } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import './NavMenu.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const NavMenu = ({ username }) => {
  const [showUsername, setShowUsername] = useState(false);
  
  const history = useHistory();

  const handleCartClick = () => {
/*    history.push('/login');*/
  };

  
  const handleUserClick = () => {
    history.push('/login');
  };

  const handleIconHover = () => {
    setShowUsername(true);
  };

  const handleIconLeave = () => {
    setShowUsername(false);
  };
  
  return (
      <header>
        <Navbar color="dark" dark expand="md" className="fixed-top">
          <Container>
            <NavbarBrand href="/">Shop</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="nav-icon mx-5"
                  onClick={handleCartClick}
              />
              {showUsername && (
                  <div className="username">
                    {username}
                  </div>
              )}
              <FontAwesomeIcon
                  icon={faUser}
                  className="nav-icon"
                  onClick={handleUserClick}
                  onMouseEnter={handleIconHover}
                  onMouseLeave={handleIconLeave}
              />
            </Nav>
          </Container>
        </Navbar>
      </header>
  );
}

export default NavMenu;
