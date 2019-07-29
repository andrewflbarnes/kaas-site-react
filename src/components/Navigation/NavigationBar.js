import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import FilterDropdowns from '../FilterDropdowns'

// Mobile device navbar which expands to a desktop navbar at the md breakpoint
// The somewhat convoluted layout ensures
// - correct center alignment in mobile layout
// - correct collapse transitioning in mobile layout
// - correct start/end alignment in desktop layout
export default React.memo(() => {
  const navLinks = (
    <Nav>
      <Nav.Link href={`${process.env.PUBLIC_URL}/privacy.html`}>Privacy</Nav.Link>
      <Nav.Link href="#seeding">Seeding</Nav.Link>
      <Nav.Link href="#racing">Racing</Nav.Link>
    </Nav>
  )

  return (
    <Navbar
      className={`
        bg-dark
        border-bottom border-top border-primary
        mb-2 justify-content-between
      `}
      sticky="top"
      variant="dark"
      expand="md"
    >
      <Col
        xs={4}
        className='d-md-none d-flex justify-content-start px-0'
      >
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
        />
      </Col>
      <Col
        xs={4}
        className='d-flex px-0 justify-content-center justify-content-md-start'
      >
        <Navbar.Brand
          className='text-primary d-flex m-0'
          href="#"
        >
          <b>Kings</b>&nbsp;Ski Club
        </Navbar.Brand>
        <div className='d-none d-md-block'>
          {navLinks}
        </div>
      </Col>
      <Col
        xs={4}
        className='d-flex justify-content-end px-0'
      >
        <FilterDropdowns/>
      </Col>
      <div className='d-md-none col-12'>
        <Navbar.Collapse id="basic-navbar-nav">
          {navLinks}
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
})