import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterSelect from './FilterSelect'
import Button from 'react-bootstrap/Button';
import * as actions from '../action_creators'

export function RawFilterOptions({
  competitions, competition,
  seasons, season,
  leagues, league,
  onFilterActivated,
  applyFilters, cancelFilters, resetFilters
}) {
  function applyAndToggle() {
    applyFilters()
    onFilterActivated()
  }

  function cancelAndToggle() {
    cancelFilters()
    onFilterActivated()
  }

  function resetAndToggle() {
    resetFilters()
    onFilterActivated()
  }

  return (
    <>
      <FilterSelect title="Competition" type="competition" list={competitions} current={competition}/>
      <FilterSelect title="Season" type="season" list={seasons} current={season}/>
      <FilterSelect title="League" type="league" list={leagues} current={league}/>
      <div className="col-12 d-flex justify-content-between">
      {/* <div className="col-md-6 offset-md-3"> */} 
        <Button className="col-3 mx-auto" variant="outline-success" onClick={applyAndToggle}>Apply</Button>
        <Button className="col-3 mx-auto" variant="outline-warning" onClick={cancelAndToggle}>Cancel</Button>
        <Button className="col-3 mx-auto" variant="outline-danger" onClick={resetAndToggle}>Reset</Button>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { filters, kaas } = state
  const { competitions, seasons, leagues } = kaas
  const { competition, season, league } = filters.nextFilters

  return {
    competitions,
    competition,
    seasons,
    season,
    leagues,
    league
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const FilterOptions = connect(mapStateToProps, mapDispatchToProps)(RawFilterOptions);

export default FilterOptions