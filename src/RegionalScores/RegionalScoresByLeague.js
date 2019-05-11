import React from 'react'
import api from '../api';
import RegionalScoreCompetitionClub from './RegionalScoreCompetitionClub';
import DropdownOptions from '../DropdownOptions/DropdownOptions';
import Collapse from 'react-bootstrap/Collapse';

export default class RegionalScoresByLeague extends React.Component {
  constructor() {
    super()

    this.state = {
      reducedScores: [],
      leagues: [],
      seasons: [],
      competitions: [],
      regionals: [],
      showOptions: false
    }

    this.getScores = this.getScores.bind(this)
    this.accumulateLeague = this.accumulateLeague.bind(this)
    this.handleCompetitionToggle = this.handleCompetitionToggle.bind(this)
    this.handleLeagueToggle = this.handleLeagueToggle.bind(this)
    this.handleSeasonToggle = this.handleSeasonToggle.bind(this)
    this.reduceToUnique = this.reduceToUnique.bind(this)
  }

  componentDidMount() {
    this.getScores();
  }

  reduceToUnique(scores, type) {
    return scores.map(s =>
      s[type]
    ).filter((value, index, self) =>
      self.indexOf(value) === index
    )
  }

  getScores() {
    api.getRegionalScores().then(regionalScores => {
      const reducedScores = this.accumulateLeague(regionalScores)
      const competitions = this.reduceToUnique(regionalScores, "competition")
      const leagues = this.reduceToUnique(regionalScores, "league")
      const seasons = this.reduceToUnique(regionalScores, "season")
      const regionals = this.reduceToUnique(regionalScores, "regional")

      this.setState({
        reducedScores,
        competitions,
        leagues,
        seasons,
        regionals
      })
    })
  }

  accumulateLeague(scores) {
    return scores.reduce((acc, cur) => {
      const { competition, season, league, regional, division, club, team, score } = cur

      let index = acc.findIndex(e =>
        e.competition === competition &&
        e.season === season &&
        e.league === league
      )

      if (index < 0) {
        acc.push({
          competition,
          season,
          league,
          clubs: [
            {
              name: club,
              divisions: [
                {
                  name: division,
                  teams: [
                    {
                      name: team,
                      scores: {
                        [regional]: score,
                        total: score
                      }
                    }
                  ]
                }
              ]
            }
          ],
        })
      } else {
        const clubs = acc[index].clubs
        const clubIndex = clubs.findIndex(e =>
          e.name === club  
        )

        if (clubIndex < 0) {
          clubs.push({
            name: club,
            divisions: [
              {
                name: division,
                teams: [
                  {
                    name: team,
                    scores: {
                      [regional]: score,
                      total: score
                    }
                  }
                ]
              }
            ]
          })
        } else {
          const divisions = clubs[clubIndex].divisions
          const divisionIndex = divisions.findIndex(e =>
            e.name === division  
          )
  
          if (divisionIndex < 0) {
            divisions.push({
              name: division,
              teams: [
                {
                  name: team,
                  scores: {
                    [regional]: score,
                    total: score
                  }
                }
              ]
            })
          } else {
            const teams = divisions[divisionIndex].teams
            const teamIndex = teams.findIndex(e =>
              e.name === team
            )
    
            if (teamIndex < 0) {
              teams.push({
                name: team,
                scores: {
                  [regional]: score,
                  total: score
                }
              })
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

  handleLeagueToggle(league) {
    this.props.handleFilterChange("league", league)
  }

  handleSeasonToggle(season) {
    this.props.handleFilterChange("season", season)
  }

  handleCompetitionToggle(competition) {
    this.props.handleFilterChange("competition", competition)
  }

  render() {
    const { handleCompetitionToggle, handleSeasonToggle, handleLeagueToggle, state, props } = this
    const { reducedScores, leagues, competitions, seasons, regionals } = state
    const { activeFilters, nextFilters, handleApplyFilters, handleCancelFilters, showFilters } = props

    const { competition: activeCompetition, season: activeSeason, league: activeLeague } = activeFilters
    const filteredScores = reducedScores.filter(e => {
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

    const { competition, season, league } = nextFilters
    const optionProps = {
      competitions,
      competition,
      seasons,
      season,
      leagues,
      league,
      handleCompetitionToggle,
      handleSeasonToggle,
      handleLeagueToggle,
      handleApplyFilters,
      handleCancelFilters
    }

    return (
      <>
        <Collapse in={showFilters}>
          <div>
            <DropdownOptions {...optionProps} />
          </div>
        </Collapse>
        {filteredScores.map(e => 
          <RegionalScoreCompetitionClub key={`${e.competition}_${e.season}_${e.league}`} regionals={regionals} {...e} />
        )}
      </>
    )
  }
}