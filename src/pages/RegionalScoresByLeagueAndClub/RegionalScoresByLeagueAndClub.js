import React from 'react'
import { connect } from 'react-redux'
import { havePropsOrStateChanged } from '../../common/kaas_helper';
import RegionalScoresLeagueClub from '../../components/RegionalScoresLeagueClub';

export class RawRegionalScoresByLeagueAndClub extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['filteredScores', 'regionals'])
  }

  render() {
    const { filteredScores, regionals: allRegionals } = this.props

    return (
      <>
        {filteredScores.length > 0
          ? filteredScores.map(e => {
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
  const { filters: { activeFilters }, kaas: { scores, regionals }} = state
  const { competition, season, league } = activeFilters

  const filteredScores = scores.filter(e => {
    if (competition && e.competition !== competition) {
      return false
    }
    if (season && e.season !== season) {
      return false
    }
    if (league && e.league !== league) {
      return false
    }

    return true
  })

  return {
    filteredScores,
    regionals
  }
}

const RegionalScoresByLeagueAndClub = connect(mapStateToProps)(RawRegionalScoresByLeagueAndClub)

export default RegionalScoresByLeagueAndClub