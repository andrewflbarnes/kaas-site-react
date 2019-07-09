import React from 'react'
import ScoresTables from '../ScoresTables'
import RegionalScoresLeagueHeader from './RegionalScoresLeagueHeader';

export function RawRegionalScoresLeague({ competition, season, league, scores, divisions, regionals }) {
  console.log(regionals)
  return (
    <>
      <RegionalScoresLeagueHeader
        competition={competition}
        season={season}
        league={league}
      />

      <ScoresTables
        scores={scores}
        isCollapsed={true}
        regionals={regionals}
        divisions={divisions}
        title={false}
      />
    </>
  )
}

const RegionalScoresLeague = React.memo(RawRegionalScoresLeague)

export default RegionalScoresLeague