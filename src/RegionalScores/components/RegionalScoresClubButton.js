import React from 'react'
import Button from 'react-bootstrap/Button'

export default function RegionalScoresClubButton({ onCollapse, clubName }) {
  return (
    <Button size="lg" className="col-12" variant="none"  onClick={() => onCollapse(clubName)}>
      <h5>{clubName}</h5>
    </Button>
  )
}