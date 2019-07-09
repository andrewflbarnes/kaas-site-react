import React from 'react'
import { connect } from 'react-redux'
import RegionalScoresLeague from '../../components/RegionalScoresLeague'
import * as kaas_helper from '../../common/kaas_helper';

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
  const { filters: { activeFilters }, kaas: { leagues, scores, divisions, regionals, seasons }} = state
  const { competition, season, league } = activeFilters

  // TODO move all filters to reducers/action_creators
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

  const filteredRegionals = regionals.filter(e => {
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

  const filteredLeagues = leagues.filter(e => {
    if (competition && e.competition !== competition) {
      return false
    }
    if (season && e.season !== season) {
      return false
    }
    if (league && e.name !== league) {
      return false
    }

    return true
  })

  const filteredSeasons = seasons.filter(e => {
    if (competition && e.competition !== competition) {
      return false
    }
    if (season && e.name !== season) {
      return false
    }

    return true
  })

  return {
    scores: filteredScores,
    leagues: filteredLeagues,
    divisions,
    seasons: filteredSeasons,
    regionals: filteredRegionals,
  }
}

const RegionalScoresByLeague = connect(mapStateToProps)(RawRegionalScoresByLeague)

export default RegionalScoresByLeague