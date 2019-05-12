import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import api from '../../api';
import RegionalScoreCompetitionClub from './RegionalScoresByClub';
import * as actions from '../action_creators'

export class RawRegionalScoresByLeague extends React.Component {
  constructor() {
    super()

    this.getScores = this.getScores.bind(this)
    this.accumulateLeague = this.accumulateLeague.bind(this)
    this.reduceToUnique = this.reduceToUnique.bind(this)
  }

  componentDidMount() {
    this.getScores();
  }

  reduceToUnique(scores, type, reverseOrder = false) {
    return scores.map(s =>
      s[type]
    ).filter((value, index, self) =>
      self.indexOf(value) === index
    ).sort((i, j) =>
      reverseOrder ? j.localeCompare(i) : i.localeCompare(j)
    )
  }

  getScores() {
    api.getRegionalScores().then(regionalScores => {
      const { setRegionalScores, setCompetitions, setSeasons, setLeagues, setRegionals } = this.props
      setRegionalScores(
        this.accumulateLeague(regionalScores)
      )
      setCompetitions(
        this.reduceToUnique(regionalScores, "competition")
      )
      setLeagues(
        this.reduceToUnique(regionalScores, "league")
      )
      setSeasons(
        this.reduceToUnique(regionalScores, "season", true)
      )
      setRegionals(
        this.reduceToUnique(regionalScores, "regional")
      )
    })
  }

  accumulateLeague(scores) {
    return scores.sort((i, j) => {
      const { competition: iCompetition, season: iSeason, league: iLeague } = i
      const { competition: jCompetition, season: jSeason, league: jLeague } = j

      let result = iCompetition.localeCompare(jCompetition)
      if (result === 0) {
        // Most recent first so reverse comparison
        result = jSeason.localeCompare(iSeason)
        if (result === 0) {
          result = iLeague.localeCompare(jLeague)
        }
      }

      return result
    }).reduce((acc, cur) => {
      const { competition, season, league, regional, division, club, team, score } = cur

      let index = acc.findIndex(e =>
        e.competition === competition &&
        e.season === season &&
        e.league === league
      )

      const newTeam = {
        name: team,
        scores: {
          [regional]: score,
          total: score
        }
      }
  
      const newDivision = {
        name: division,
        teams: [
          newTeam
        ]
      }
  
      const newClub = {
        name: club,
        divisions: [
          newDivision
        ]
      }

      if (index < 0) {
        acc.push({
          competition,
          season,
          league,
          clubs: [
            newClub
          ],
        })
      } else {
        const clubs = acc[index].clubs
        const clubIndex = clubs.findIndex(e =>
          e.name === club  
        )

        if (clubIndex < 0) {
          clubs.push(newClub)
        } else {
          const divisions = clubs[clubIndex].divisions
          const divisionIndex = divisions.findIndex(e =>
            e.name === division  
          )
  
          if (divisionIndex < 0) {
            divisions.push(newDivision)
          } else {
            const teams = divisions[divisionIndex].teams
            const teamIndex = teams.findIndex(e =>
              e.name === team
            )
    
            if (teamIndex < 0) {
              teams.push(newTeam)
            } else {
              const scores = teams[teamIndex].scores
              const { total } = scores
              teams[teamIndex].scores = {
                ...scores,
                [regional]: score,
                total: total + score
              }
            }
          }
        }
      }
      return acc;
    }, [])
  }

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
        {filteredScores.map(e => 
          <RegionalScoreCompetitionClub key={`${e.competition}_${e.season}_${e.league}`} {...e} />
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  const { activeFilters } = state.filters
  const { scores } = state.regionalScores

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