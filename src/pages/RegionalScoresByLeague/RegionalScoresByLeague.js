import React from 'react'
import ScoreTableSLDC from '../../components/ScoreTableSLDC';

export function RawRegionalScoresByLeague() {
  return <ScoreTableSLDC title />
}

const RegionalScoresByLeague = React.memo(RawRegionalScoresByLeague)

export default RegionalScoresByLeague