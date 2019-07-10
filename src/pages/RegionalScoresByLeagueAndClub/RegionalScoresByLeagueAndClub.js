import React from 'react'
import { connect } from 'react-redux'
import { havePropsOrStateChanged } from '../../common/kaas_helper';
import RegionalScoresLeagueClub from '../../components/RegionalScoresLeagueClub';
import * as kaasSelectors from '../../selectors/kaas'

export class RawRegionalScoresByLeagueAndClub extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['scores', 'regionals'])
  }

  render() {
    const { scores, regionals: allRegionals } = this.props

    return (
      <>
        {scores.length > 0
          ? scores.map(e => {
            const { competition, season, league } = e
            const regionals = allRegionals.filter(r => 
              r.competition === competition &&
              r.season === season &&
              r.league === league  
            )

            return (
              <RegionalScoresLeagueClub
                key={`${competition}_${season}_${league}`}
                regionals={regionals}
                {...e}
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
  return {
    scores: kaasSelectors.getFilteredScores(state),
    regionals: kaasSelectors.getFilteredRegionals(state)
  }
}

const RegionalScoresByLeagueAndClub = connect(mapStateToProps)(RawRegionalScoresByLeagueAndClub)

export default RegionalScoresByLeagueAndClub