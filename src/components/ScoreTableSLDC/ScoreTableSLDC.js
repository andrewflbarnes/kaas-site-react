import React from 'react'
import { connect } from 'react-redux'
import ScoreTable from '../ScoreTable'
import { havePropsOrStateChanged, arePropsOrStateStillUndefined } from '../../common/kaas_helper';
import * as kaasSelectors from '../../selectors/kaas'
import ScoreHeader from './ScoreHeader';

export class RawScoreTableSLDC extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (arePropsOrStateStillUndefined(this.props, nextProps, ['scores', 'seasons', 'leagues', 'divisions', 'regionals'])) {
      return false
    }
    return havePropsOrStateChanged(this.props, nextProps, ['scores', 'seasons', 'leagues', 'divisions', 'regionals', 'title'])
  }

  render() {
    const { scores, seasons, leagues, divisions, regionals } = this.props
    const seasonTitle = seasons.length > 1

    // Short circuit if not able to render
    // TODO check this is appropriate
    return scores && seasons && leagues && divisions && regionals
    ? <>
        {seasons.map(season => 
          this.renderSeason(season.name, seasonTitle)
        )}
      </>
    : <h6>No Results</h6>
  }

  renderSeason(seasonName, seasonTitle) {
    const { leagues } = this.props

    return (
      <div key={`${seasonName}`}>
        {seasonTitle && <ScoreHeader h2 name={seasonName}/>}
        {leagues.map(league => 
          this.renderLeague(seasonName, league.name)
        )}
      </div>
    )
  }

  renderLeague(seasonName, leagueName) {
    const { divisions } = this.props

    return (
      <div key={`${seasonName}_${leagueName}`}>
        <ScoreHeader h3 name={leagueName}/>
        {divisions.map(division =>
          <div key={division}>
            {this.renderDivision(seasonName, leagueName, division)}
          </div>
        )}
      </div>
    )
  }

  renderDivision(seasonName, leagueName, divisionName) {
    const { scores, regionals, title, clubName } = this.props

    return (
      <div key={`${seasonName}_${leagueName}_${divisionName}`}>
        <ScoreHeader h6 name={divisionName}/>
        <ScoreTable
          regionals={regionals.filter(r =>
            (!leagueName || r.league === leagueName) &&
            (!seasonName || r.season === seasonName)
          )}
          scores={scores.filter(s => 
            (!divisionName || s.division === divisionName) &&
            (!leagueName || s.league === leagueName) &&
            (!seasonName || s.season === seasonName) &&
            (!clubName || s.club === clubName)
          )}
          title={title}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    scores: kaasSelectors.getFilteredScores(state),
    leagues: kaasSelectors.getFilteredLeagues(state),
    divisions: kaasSelectors.getFilteredDivisions(state),
    seasons: kaasSelectors.getFitleredSeasons(state),
    regionals: kaasSelectors.getFilteredRegionals(state),
  }
}

const ScoreTableSLDC = connect(mapStateToProps)(RawScoreTableSLDC)

export default ScoreTableSLDC