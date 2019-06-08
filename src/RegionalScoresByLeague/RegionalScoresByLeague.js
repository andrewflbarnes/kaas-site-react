import React from 'react'
import RegionalScoresClub from '../RegionalScoresClub'
import { RegionalScoresByLeagueHeader } from './RegionalScoresByLeagueHeader';

export default class RegionalScoresByLeague extends React.PureComponent {
  render() {
    const { competition, season, league, clubs, regionals } = this.props

    return (
      <>
        <RegionalScoresByLeagueHeader
          competition={competition}
          season={season}
          league={league}
        />
        {clubs.map(c =>
          <RegionalScoresClub
            key={c.name}
            {...c}
            regionals={regionals}
          />
        )}
      </>
    )
  }
}