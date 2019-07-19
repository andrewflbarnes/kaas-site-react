import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import FilterDropdowns from '../FilterDropdowns'

export default class NavigationBar extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      isDesktop: false
    }

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    // Collapse shows by default below the md threshold
    this.setState({
      isDesktop: window.innerWidth >= 768
    })
  }

  render() {
    const { isDesktop } = this.state

    const navCollapse = (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#seeding">Seeding</Nav.Link>
          <Nav.Link href="#racing">Racing</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    )

    return (
      <Navbar
        className="mb-2 bg-dark border-bottom border-top border-primary"
        sticky="top"
        variant="dark"
        expand="md"
        onToggle={this.handleToggle}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand
          className="text-primary"
          href="#"
        >
          <b>Kings</b> Ski Club
        </Navbar.Brand>
        {isDesktop &&
          navCollapse
        }
        <FilterDropdowns />
        {!isDesktop &&
          navCollapse
        }
      </Navbar>
    )
  }
}