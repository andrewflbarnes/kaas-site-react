import React from 'react'
import { connect } from 'react-redux'
import RegionalScoresClubButton from './RegionalScoresClubButton'
import RegionalScoresClubRow from './RegionalScoresClubRow';

export class RawRegionalScoresClub extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleCollapse = this.handleCollapse.bind(this)
  }


  handleCollapse(item) {
    const open = this.state[item]
    this.setState({
      [item]: !open
    })
  }

  render() {
    const {competition, season, league, clubs, title, regionals: allRegionals } = this.props

    const regionals = allRegionals.filter(r => 
      r.competition === competition &&
      r.season === season &&
      r.league === league  
    )
    
    return (
      <>
        {clubs.map(c =>
          <div key={c.name}>
            <RegionalScoresClubButton clubName={c.name} onCollapse={this.handleCollapse} />
            <RegionalScoresClubRow club={c} isCollapsed={this.state[c.name]} regionals={regionals} title={title}/>
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  const { regionals } = state.kaas
  return { regionals }
}

const RegionalScoresClub = connect(mapStateToProps)(RawRegionalScoresClub)

export default RegionalScoresClub