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
// - 
// - 
// - 
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
    const brandJustify = isDesktop
      ? 'justify-content-start'
      : 'justify-content-center'

    const navCollapse = (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="#seeding">Seeding</Nav.Link>
          <Nav.Link href="#racing">Racing</Nav.Link>
        </Nav>
      </Navbar.Collapse>
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
        onToggle={this.handleToggle}
      >
        {!isDesktop &&
          <Col
            xs={4}
            className='d-flex justify-content-start px-0'
          >
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
            />
          </Col>
        }
        <Col
          xs={4}
          className={'d-flex px-0 ' + brandJustify}
        >
          <Navbar.Brand
            className='text-primary d-flex m-0'
            href="#"
          >
            <b>Kings</b> Ski Club
          </Navbar.Brand>
          {isDesktop &&
            navCollapse
          }
        </Col>
        <Col
          xs={4}
          className='d-flex justify-content-end px-0'
        >
          <FilterDropdowns/>
        </Col>
        {!isDesktop &&
          navCollapse
        }
      </Navbar>
    )
  }
}