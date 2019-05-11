import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import ScoresByLeague from './RegionalScores';
import Navigation from './Navigation';
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

  render() {
    const { state, toggleShowFilters, toggleExpandNavbar } = this
    const { expandNavbar } = state
    const scoreProps = {
      ...state,
      toggleShowFilters
    }

    const navProps = {
      toggleShowFilters,
      toggleExpandNavbar,
      expandNavbar
    }

    return (
      <div className="App col-lg-10 offset-lg-1 px-0" >
        <Provider store={store}>
          <Navigation {...navProps} />
          <ScoresByLeague {...scoreProps} />
        </Provider>
      </div>
    )
  }
}
