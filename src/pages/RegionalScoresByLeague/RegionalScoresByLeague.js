import React from 'react'
import ScoreTableSLDC from '../../components/ScoreTableSLDC';

export function RawRegionalScoresByLeague() {
  return <ScoreTableSLDC />
}

const RegionalScoresByLeague = React.memo(RawRegionalScoresByLeague)

export default RegionalScoresByLeague