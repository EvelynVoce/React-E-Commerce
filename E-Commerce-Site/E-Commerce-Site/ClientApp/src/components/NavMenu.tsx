import React, {ReactNode, useState} from 'react';
import { Container, Navbar, NavbarBrand, Nav } from 'reactstrap';
// @ts-ignore
import {useHistory} from 'react-router-dom';
import './NavMenu.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag, faHeart } from '@fortawesome/free-solid-svg-icons';

interface NavProps {
  username: string;
  userId: string;
}

const NavMenu = ({ username, userId }: NavProps) => {
  const [showUsername, setShowUsername] = useState(false);
  
  const history = useHistory();

  const handleHomeClick = () => {
    const currentLocation = history.location.pathname;

    if (currentLocation === '/') {
      window.location.reload();
    } else {
      history.push('/');
    }
  }

  const handleLikedItemClick = async () => {
    history.push('/viewLikedItems');
  };
  
  const handleCartClick = async () => {
    history.push('/viewCart');
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
            <NavbarBrand className="nav-icon" onClick={handleHomeClick}>Shop</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <div>
                <FontAwesomeIcon
                    icon={faHeart}
                    className="nav-icon"
                    onClick={handleLikedItemClick}
                />
                <FontAwesomeIcon
                    icon={faShoppingBag}
                    className="nav-icon mx-5"
                    onClick={handleCartClick}
                />
                {showUsername && <div className="username">{username}</div>}
                <FontAwesomeIcon
                    icon={faUser}
                    className="nav-icon"
                    onClick={handleUserClick}
                    onMouseEnter={handleIconHover}
                    onMouseLeave={handleIconLeave}
                />
              </div>
            </Nav>
          </Container>
        </Navbar>
      </header>
  );
}

export default NavMenu;
