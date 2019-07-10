import React from 'react'
import { connect } from 'react-redux'
import RegionalScoresLeague from '../../components/RegionalScoresLeague'
import * as kaas_helper from '../../common/kaas_helper';
import * as kaasSelectors from '../../selectors/kaas'

export class RawRegionalScoresByLeague extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (kaas_helper.arePropsOrStateStillUndefined(this.props, nextProps, ['scores', 'leagues', 'regionals', 'divisions'])) {
      return false
    }
    return kaas_helper.havePropsOrStateChanged(this.props, nextProps, ['scores', 'leagues', 'regionals', 'divisions'])
  }

  render() {
    const { scores, divisions, leagues, regionals } = this.props

    console.table(scores)

    return (
      <>
        {leagues.length > 0 && scores && divisions && regionals
          ? leagues.map(league => {
            const { name, competition, season } = league

            return (
              <RegionalScoresLeague
                key={`${competition}_${season}_${name}`}
                league={name}
                regionals={regionals.filter(r => r.league === name)}
                divisions={divisions}
                scores={scores.filter(s => s.league === name)}
              />
            )
          }) : (
            <h1>No results</h1>
          )
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  const { kaas: { divisions }} = state

  return {
    scores: kaasSelectors.getFilteredScores(state),
    leagues: kaasSelectors.getFilteredLeagues(state),
    divisions: kaasSelectors.getFilteredDivisions(state),
    seasons: kaasSelectors.getFitleredSeasons(state),
    regionals: kaasSelectors.getFilteredRegionals(state),
  }
}

const RegionalScoresByLeague = connect(mapStateToProps)(RawRegionalScoresByLeague)

export default RegionalScoresByLeague