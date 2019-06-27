import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterSelect from './FilterSelect'
import Button from 'react-bootstrap/Button';
import * as actions from '../../state/filters/action_creators'

export class RawFilterOptions extends React.PureComponent {
  render() {
    const {competitions, competition,
      seasons, season,
      leagues, league,
      onFilterActivated,
      applyFilters, cancelFilters, resetFilters
    } = this.props
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
          <Button className="col-3 mx-auto" variant="outline-success" onClick={applyAndToggle}>Apply</Button>
          <Button className="col-3 mx-auto" variant="outline-warning" onClick={cancelAndToggle}>Cancel</Button>
          <Button className="col-3 mx-auto" variant="outline-danger" onClick={resetAndToggle}>Reset</Button>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { filters, kaas } = state
  const { competitions, seasons, leagues } = kaas
  const { competition, season, league } = filters.nextFilters

  return {
    competitions: competitions.map(c => c.name),
    competition,
    seasons: seasons.map(s => s.name),
    season,
    leagues: leagues.map(l => l.name),
    league
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const FilterOptions = connect(mapStateToProps, mapDispatchToProps)(RawFilterOptions);

export default FilterOptions