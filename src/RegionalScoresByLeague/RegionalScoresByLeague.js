import React from 'react'
import { connect } from 'react-redux'
import RegionalScoresLeague from '../RegionalScoresLeague'

export class RawRegionalScoresByLeague extends React.PureComponent {
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
              <RegionalScoresLeague
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
  const { competition: activeCompetition, season: activeSeason, league: activeLeague } = activeFilters

  const filteredScores = scores.filter(e => {
    if (activeCompetition && e.competition !== activeCompetition) {
      return false
    }
    if (activeSeason && e.season !== activeSeason) {
      return false
    }
    if (activeLeague && e.league !== activeLeague) {
      return false
    }

    return true
  })

  return {
    filteredScores,
    regionals
  }
}

const RegionalScoresByLeague = connect(mapStateToProps)(RawRegionalScoresByLeague)

export default RegionalScoresByLeague