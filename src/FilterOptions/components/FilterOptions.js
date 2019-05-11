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
  applyFilters, cancelFilters
}) {
  return (
    <>
      <FilterSelect title="Competition" type="competition" list={competitions} current={competition}/>
      <FilterSelect title="Season" type="season" list={seasons} current={season}/>
      <FilterSelect title="League" type="league" list={leagues} current={league}/>
      <div className="col-md-4 offset-md-4">
        <Button className="col-3 col-md-5 mx-1" variant="outline-success" onClick={applyFilters}>Apply</Button>
        <Button className="col-3 col-md-5 mx-1" variant="outline-danger" onClick={cancelFilters}>Cancel</Button>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const FilterOptions = connect(mapStateToProps, mapDispatchToProps)(RawFilterOptions);

export default FilterOptions