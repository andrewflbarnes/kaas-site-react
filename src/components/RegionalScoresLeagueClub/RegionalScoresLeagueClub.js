import React from 'react'
import RegionalScoresClub from '../RegionalScoresClub'
import RegionalScoresLeagueHeader from './RegionalScoresLeagueHeader';

export function RawRegionalScoresLeagueClub({ competition, season, league, clubs, regionals }) {
  return (
    <>
      <RegionalScoresLeagueHeader
        competition={competition}
        season={season}
        league={league}
      />

      {/* {clubs.map(c =>
        <RegionalScoresClub
          key={c.name}
          {...c}
          regionals={regionals}
        />
      )} */}
    </>
  )
}

const RegionalScoresLeagueClub = React.memo(RawRegionalScoresLeagueClub)

export default RegionalScoresLeagueClub