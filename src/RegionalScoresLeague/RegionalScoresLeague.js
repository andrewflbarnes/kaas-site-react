import React from 'react'
import RegionalScoresClub from '../RegionalScoresClub'
import { RegionalScoresLeagueHeader } from './RegionalScoresLeagueHeader';

export default class RegionalScoresLeague extends React.PureComponent {
  render() {
    const { competition, season, league, clubs, regionals } = this.props

    return (
      <>
        <RegionalScoresLeagueHeader
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