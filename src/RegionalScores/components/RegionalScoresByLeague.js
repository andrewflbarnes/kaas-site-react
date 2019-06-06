import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RegionalScoresByClub from './RegionalScoresByClub'
import * as actions from '../../common/action_creators'

// TODO function/PureComponent
export class RawRegionalScoresByLeague extends React.Component {
  render() {
    const { scores, activeFilters } = this.props
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

    return (
      <>
        {filteredScores.length > 0
          ? filteredScores.map(e => 
            <RegionalScoresByClub key={`${e.competition}_${e.season}_${e.league}`} {...e} />
          ) : (
            <h1>No results</h1>
          )
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  const { activeFilters } = state.filters
  const { scores } = state.kaas

  return {
    activeFilters,
    scores
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

const RegionalScoresByLeague = connect(mapStateToProps, mapDispatchToProps)(RawRegionalScoresByLeague)

export default RegionalScoresByLeague