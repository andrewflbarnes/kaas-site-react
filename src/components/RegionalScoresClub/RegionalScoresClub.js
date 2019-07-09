import React from 'react'
import RegionalScoresClubButton from './RegionalScoresClubButton'
import ScoresTables from '../ScoresTables';

export default class RegionalScoresClub extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(item) {
    const open = this.state[item]
    this.setState({
      [item]: !open
    })
  }

  render() {
    const { name, title, regionals, divisions } = this.props
    
    return (
      <>
        <RegionalScoresClubButton
          clubName={name}
          onClick={this.handleClick}
        />
        <ScoresTables
          hierarchy={divisions}
          isCollapsed={this.state[name]}
          regionals={regionals}
          title={title}
        />
      </>
    )
  }
}