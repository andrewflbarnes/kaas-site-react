import React from 'react'
import { connect } from 'react-redux'
import RegionalScoresLeague from './RegionalScoresLeague'
import * as kaasHelper from '../../common/kaas_helper';
import * as kaasSelectors from '../../selectors/kaas'

export class RawRegionalScoresLeagues extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (kaasHelper.arePropsOrStateStillUndefined(this.props, nextProps, ['scores', 'leagues', 'seasons', 'regionals', 'divisions'])) {
      return false
    }
    return kaasHelper.havePropsOrStateChanged(this.props, nextProps, ['scores', 'leagues', 'seasons', 'regionals', 'divisions'])
  }

  render() {
    const { scores, seasons, divisions, leagues, regionals } = this.props

    return leagues.length > 0 && scores && divisions && regionals
      ? <>
          {seasons.map(season => {
            return leagues.map(league => {
                const { name, competition } = league

                return (
                  <RegionalScoresLeague
                    key={`${competition}_${season.name}_${name}`}
                    league={name}
                    competition={competition}
                    season={season.name}
                    regionals={regionals.filter(r =>
                      r.league === name && r.season === season.name)}
                    divisions={divisions}
                    scores={scores.filter(s =>
                      s.league === name && s.season === season.name)}
                  />
                )
              })
          })}
        </>
      : <h1>No Results</h1>
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

const RegionalScoresLeagues = connect(mapStateToProps)(RawRegionalScoresLeagues)

export default RegionalScoresLeagues