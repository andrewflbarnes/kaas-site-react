import React from 'react'

export function RawRegionalScoresLeagueHeader({competition, season, league }) {
  return (
      <h3 className="mt-3">{competition}:{season}:{league}</h3>
  )
}

const RegionalScoresLeagueHeader = React.memo(RawRegionalScoresLeagueHeader)

export default RegionalScoresLeagueHeader