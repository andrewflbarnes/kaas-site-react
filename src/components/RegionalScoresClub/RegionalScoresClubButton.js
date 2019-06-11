import React from 'react'
import Button from 'react-bootstrap/Button'

export function RawRegionalScoresClubButton({ clubName, onClick }) {
  return (
    <Button size="lg" className="col-12" variant="none"  onClick={() => onClick(clubName)}>
      <h5>{clubName}</h5>
    </Button>
  )
}

const RegionalScoresClubButton = React.memo(RawRegionalScoresClubButton)

export default RegionalScoresClubButton