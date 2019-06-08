import React from 'react'
import Button from 'react-bootstrap/Button'

export default class RegionalScoresClubButton extends React.PureComponent {
  render() {
    const { clubName, onCollapse } = this.props
    
    return (
      <Button size="lg" className="col-12" variant="none"  onClick={() => onCollapse(clubName)}>
        <h5>{clubName}</h5>
      </Button>
    )
  }
}