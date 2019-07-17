import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import FilterDropdowns from '../FilterDropdowns'

export function RawNavigationBar() {
  return (
    <Navbar
      className="mb-2 border-bottom border-top border-primary"
      sticky="top"
      variant="dark"
      expand="md"
    >
      <Navbar.Brand className="text-primary" href="#"><b>Kings</b> Ski Club</Navbar.Brand>
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