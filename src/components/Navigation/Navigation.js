import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import FilterOptions from '../FilterOptions'
import FilterDisplay from '../FilterDisplay'
import ErrorBar from '../ErrorBar'
import * as actions from '../../state/filters/action_creators'

export class RawNavigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showFilters: false
    }

    this.toggleShowFilters = this.toggleShowFilters.bind(this)
    this.handleFilterActivated = this.handleFilterActivated.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  toggleShowFilters() {
    const { showFilters } = this.state
    this.setState({
      showFilters: !showFilters
    })
  }

  handleFilterActivated() {
    this.setState({
      showFilters: false
    })
  }

  handleHide() {
    const { cancelFilters } = this.props

    this.toggleShowFilters()
    cancelFilters()
  }

  render() {
    const { handleHide, toggleShowFilters, handleFilterActivated, state, props } = this
    const { showFilters } = state
    const { status, activeFilters } = props

    return (
      <>
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

        {status.length > 0 && <ErrorBar />}

        <FilterDisplay filters={activeFilters}/>

        <Modal show={showFilters} onHide={handleHide}>
          <Modal.Body>
            <FilterOptions onFilterActivated={handleFilterActivated} />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { status, filters: { activeFilters } } = state

  return {
    activeFilters,
    status
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const Navigation = connect(mapStateToProps, mapDispatchToProps)(RawNavigation);

export default Navigation