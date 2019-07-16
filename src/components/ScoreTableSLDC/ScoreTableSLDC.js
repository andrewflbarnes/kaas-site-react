import React from 'react'
import { connect } from 'react-redux'
import ScoreTableAuto from '../ScoreTableAuto'
import { havePropsOrStateChanged, arePropsOrStateStillUndefined } from '../../common/kaas_helper';
import * as kaasSelectors from '../../selectors/kaas'
import ScoreHeader from './ScoreHeader';
import Selector from './Selector'

export class RawScoreTableSLDC extends React.Component {
  constructor() {
    super()

    this.state = {
      league: undefined,
      division: undefined
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
      this.state, nextState, ['league', 'division'])
  }

  handleLeagueSelection = league => {
    this.setState({
      league
    })
  }

  handleDivisionSelection = division => {
    this.setState({
      division
    })
  }

  render() {
    const { seasons, leagues, divisions } = this.props
    const { league, division } = this.state

    const seasonTitle = seasons.length > 1

    // Short circuit if not able to render
    // TODO check this is appropriate
    return seasons && leagues && divisions
    ? <>
        <Selector
          elements={leagues}
          match={league}
          onSelect={this.handleLeagueSelection}
          all
        />
        {league &&
          <Selector
            elements={divisions}
            match={division}
            onSelect={this.handleDivisionSelection}
          />
        }
        {seasons.map(season => 
          this.renderSeason(season.name, seasonTitle)
        )}
      </>
    : <h6>No Results</h6>
  }

  renderSeason(seasonName, seasonTitle) {
    const { league } = this.state

    return (
      <div key={`${seasonName}`}>
        {seasonTitle && <ScoreHeader h2 name={seasonName}/>}
        {league && this.renderLeague(seasonName, league)}
      </div>
    )
  }

  renderLeague(seasonName, leagueName) {
    const { division } = this.state

    return (
      <div key={`${leagueName}`}>
        {division && this.renderDivision(seasonName, leagueName, division)}
      </div>
    )
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
}

const mapStateToProps = state => {
  return {
    leagues: kaasSelectors.getFilteredLeagues(state),
    divisions: kaasSelectors.getFilteredDivisions(state),
    seasons: kaasSelectors.getFilteredSeasons(state),
  }
}

const ScoreTableSLDC = connect(mapStateToProps)(RawScoreTableSLDC)

export default ScoreTableSLDC