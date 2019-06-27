import React from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export function RawNavigationBar({ toggleShowFilters }) {
  return (
    <Navbar sticky="top" bg="light" expand="md">
      <Navbar.Brand href="#">KAAS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#seeding">Seeding</Nav.Link>
          <Nav.Link href="#racing">Racing</Nav.Link>
          <Button className="text-secondary" variant="none" onClick={toggleShowFilters}>
            Filters
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const NavigationBar = React.memo(RawNavigationBar)

export default NavigationBar