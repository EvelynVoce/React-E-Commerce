import React, { useState } from 'react';
import { Container, Navbar, NavbarBrand, Dropdown, DropdownToggle,DropdownMenu,DropdownItem, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
      <header>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarBrand href="/">Shop</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret className="text-light">
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/signup">Signup</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </Nav>
          </Container>
        </Navbar>
      </header>
  );
}

export default NavMenu;
