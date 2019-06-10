import React from 'react'
import Button from 'react-bootstrap/Button'

export default class RegionalScoresClubButton extends React.PureComponent {
  render() {
    const { clubName, onClick } = this.props
    
    return (
      <Button size="lg" className="col-12" variant="none"  onClick={() => onClick(clubName)}>
        <h5>{clubName}</h5>
      </Button>
    )
  }
}