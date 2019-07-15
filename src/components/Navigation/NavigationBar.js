import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import FilterDropdowns from '../FilterDropdowns'

export function RawNavigationBar() {
  return (
    <Navbar sticky="top" bg="light" expand="md">
      <Navbar.Brand href="#">KAAS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#seeding">Seeding</Nav.Link>
          <Nav.Link href="#racing">Racing</Nav.Link>
        </Nav>
        <Nav>
          <FilterDropdowns />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const NavigationBar = React.memo(RawNavigationBar)

export default NavigationBar