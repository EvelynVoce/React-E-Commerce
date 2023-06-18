import React, {useState} from 'react';
import { Container, Navbar, NavbarBrand, Nav } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import './NavMenu.css';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavMenu = () => {
  // Example username until user login implemented
  const [username, setUsername] = useState('Evie');
  const [showUsername, setShowUsername] = useState(false);
  
  const history = useHistory();

  const handleIconClick = () => {
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
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarBrand href="/">Shop</NavbarBrand>
            <Nav className="ml-auto" navbar>
              {showUsername && (
                  <div className="username">
                    {username}
                  </div>
              )}
              <FontAwesomeIcon
                  icon={faUser}
                  className="user-icon"
                  onClick={handleIconClick}
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
