import React from 'react'

export class RegionalScoresByLeagueHeader extends React.PureComponent {
  render() {
    const {competition, season, league } = this.props

    return (
        <h3 className="mt-3">{competition}:{season}:{league}</h3>
    )
  }
}