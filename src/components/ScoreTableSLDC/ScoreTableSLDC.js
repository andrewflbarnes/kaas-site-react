import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, bool } from 'prop-types'
import ScoreTableAuto from '../ScoreTableAuto'
import { havePropsOrStateChanged, arePropsOrStateStillUndefined } from '../../common/kaas_helper';
import * as kaasSelectors from '../../selectors/kaas'
import Selector from './Selector'
import { division, league, season } from '../../types'

const propTypes = {
  seasons: arrayOf(season).isRequired,
  leagues: arrayOf(league).isRequired,
  divisions: arrayOf(division).isRequired,
  title: bool
}

const defaultProps = {
  title: false
}

export class RawScoreTableSLDC extends React.Component {
  constructor() {
    super()

    this.state = {
      leagueName: undefined,
      divisionName: undefined,
    }

    this.handleLeagueSelection = this.handleLeagueSelection.bind(this)
    this.handleDivisionSelection = this.handleDivisionSelection.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (arePropsOrStateStillUndefined(this.props, nextProps, ['seasons', 'leagues', 'divisions'])) {
      return false
    }
    return havePropsOrStateChanged(
      this.props, nextProps, ['seasons', 'leagues', 'divisions', 'title'],
      this.state, nextState, ['leagueName', 'divisionName'])
  }

  handleLeagueSelection(leagueName) {
    this.setState({
      leagueName
    })
  }

  handleDivisionSelection(divisionName) {
    this.setState({
      divisionName
    })
  }

  renderDivision(seasonName, leagueName, divisionName) {
    const { title } = this.props

    return (
      <div key={`${seasonName}_${leagueName}_${divisionName}`}>
        <ScoreTableAuto
          seasonName={seasonName}
          leagueName={leagueName}
          divisionName={divisionName}
          title={title}
          position
        />
      </div>
    )
  }

  renderLeague(seasonName, leagueName) {
    const { divisionName } = this.state

    return (
      <div key={`${leagueName}`}>
        {divisionName && this.renderDivision(seasonName, leagueName, divisionName)}
      </div>
    )
  }

  renderSeason(seasonName, seasonTitle) {
    const { leagueName } = this.state

    return (
      <div key={`${seasonName}`}>
        {seasonTitle && <h2>{seasonName}</h2>}
        {leagueName && this.renderLeague(seasonName, leagueName)}
      </div>
    )
  }

  render() {
    const { seasons, leagues, divisions } = this.props
    const { leagueName, divisionName } = this.state

    const seasonTitle = seasons.length > 1

    // Short circuit if not able to render
    // TODO check this is appropriate
    return seasons && leagues && divisions
    ? <>
        <Selector
          elements={leagues}
          match={leagueName}
          onSelect={this.handleLeagueSelection}
          all
        />
        {leagueName &&
          <Selector
            elements={divisions}
            match={divisionName}
            onSelect={this.handleDivisionSelection}
          />
        }
        {leagueName && divisionName &&
          seasons.map(s => 
            this.renderSeason(s.name, seasonTitle)
          )
        }
      </>
    : <h6>No Results</h6>
  }
}

RawScoreTableSLDC.propTypes = propTypes
RawScoreTableSLDC.defaultProps = defaultProps

const mapStateToProps = state => {
  return {
    leagues: kaasSelectors.getFilteredLeagues(state),
    divisions: kaasSelectors.getFilteredDivisions(state),
    seasons: kaasSelectors.getFilteredSeasons(state),
  }
}

const ScoreTableSLDC = connect(mapStateToProps)(RawScoreTableSLDC)

export default ScoreTableSLDC