import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import RegionalScores from './RegionalScores';
import FilterOptions from './FilterOptions'
import Navigation from './Navigation';
import Collapse from 'react-bootstrap/Collapse'
import store from './store'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      showFilters: false,
      expandNavbar: false
    }

    this.toggleShowFilters = this.toggleShowFilters.bind(this)
    this.toggleExpandNavbar = this.toggleExpandNavbar.bind(this)
    this.handleFilterActivated = this.handleFilterActivated.bind(this)
  }

  toggleExpandNavbar() {
    const { expandNavbar } = this.state
    this.setState({
      expandNavbar: !expandNavbar,
    })
  }

  toggleShowFilters() {
    const { showFilters } = this.state
    this.setState({
      showFilters: !showFilters
    })
  }

  handleFilterActivated() {
    this.setState({
      showFilters: false,
      expandNavbar: false
    })
  }

  render() {
    const { state, toggleShowFilters, toggleExpandNavbar } = this
    const { expandNavbar, showFilters } = state

    const navProps = {
      toggleShowFilters,
      toggleExpandNavbar,
      expandNavbar
    }

    return (
      <div className="App col-lg-10 offset-lg-1 px-0" >
        <Provider store={store}>
          <Navigation {...navProps} />
          <Collapse in={showFilters}>
            <div>
              <FilterOptions onFilterActivated={this.handleFilterActivated} />
            </div>
          </Collapse>
          <RegionalScores />
        </Provider>
      </div>
    )
  }
}
