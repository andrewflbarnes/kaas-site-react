import React from 'react';
import './App.css';
import ScoresByLeague from './RegionalScores';
import Navigation from './Navigation';

export default class App extends React.Component {
  constructor() {
    super()

    const initialFilters = {
      league: "",
      competition: "",
      season: "",
    }

    this.state = {
      activeFilters: initialFilters,
      nextFilters: initialFilters,
      showFilters: false,
      expandNavbar: false
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleApplyFilters = this.handleApplyFilters.bind(this)
    this.handleCancelFilters = this.handleCancelFilters.bind(this)
    this.toggleShowFilters = this.toggleShowFilters.bind(this)
    this.toggleExpandNavbar = this.toggleExpandNavbar.bind(this)
  }

  handleFilterChange(type, value) {
    const { nextFilters } = this.state
    this.setState({
      nextFilters: {
        ...nextFilters,
        [type]: value
      }
    })
  }

  handleApplyFilters() {
    const { nextFilters } = this.state
    this.setState({
      activeFilters: nextFilters,
      showFilters: false,
      expandNavbar: false
    })
  }

  handleCancelFilters() {
    const { activeFilters } = this.state
    this.setState({
      nextFilters: activeFilters,
      showFilters: false,
      expandNavbar: false
    })
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
    const { state, handleFilterChange, handleApplyFilters, toggleShowFilters, handleCancelFilters, toggleExpandNavbar } = this
    const { expandNavbar } = state
    const scoreProps = {
      ...state,
      handleFilterChange,
      handleApplyFilters,
      handleCancelFilters,
      toggleShowFilters
    }

    const navProps = {
      toggleShowFilters,
      toggleExpandNavbar,
      expandNavbar
    }

    return (
      <div className="App col-lg-10 offset-lg-1 px-0" >
        <Navigation {...navProps} />
        <ScoresByLeague {...scoreProps} />
      </div>
    )
  }
}
