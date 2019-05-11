import React from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Navigation({ toggleShowFilters, expandNavbar, toggleExpandNavbar }) {
  return (
    <Navbar className="col-lg-10 offset-lg-1" bg="light" expand="md" expanded={expandNavbar}>
      <Navbar.Brand href="#home">KAAS</Navbar.Brand>
      <Navbar.Toggle onClick={toggleExpandNavbar} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Button variant="none" onClick={toggleShowFilters}>
            Filters
          </Button>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  )
}