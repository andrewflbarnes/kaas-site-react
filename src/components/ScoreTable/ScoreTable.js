import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table'
import { arrayOf, bool } from 'prop-types'
import ScoreTableTH from './ScoreTableTH'
import { havePropsOrStateChanged } from '../../common/kaas_helper';
import { regional, scoreRegional } from '../../types'

const ROUND_COLUMN_WIDTH_PC = 10

const propTypes = {
  title: bool,
  position: bool,
  league: bool,
  regionals: arrayOf(regional).isRequired,
  scores: arrayOf(scoreRegional).isRequired,
}

const defaultProps  = {
  title: false,
  position: false,
  league: false,
}

class ScoreTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['scores', 'regionals', 'title', 'position', 'league'])
  }

  renderTableHeader(defaultStyle, nameStyle) {
    const { position, league, regionals } = this.props

    return (
      <thead>
        <tr>
          {league &&
            <ScoreTableTH text='' style={defaultStyle} />
          }
          {position &&
            <ScoreTableTH text='Pos.' style={defaultStyle} />
          }
          <ScoreTableTH text='Name' style={nameStyle} />
          {regionals.map(r =>
            <ScoreTableTH key={r.name} text={r.name} style={defaultStyle} />
          )}
          <ScoreTableTH text='Total' style={defaultStyle} />
        </tr>
      </thead>
    )
  }

  renderTableRow(team, i) {
    const { position, league, regionals } = this.props
    
    return (
      <tr key={team.name}>
        {league &&
          <td>
            <Badge
              pill
              variant="primary"
            >
              {team.league}
            </Badge>
          </td>
        }
        {position &&
          <td>
            {i + 1}
          </td>
        }
        <td className="px-0">
          {team.name}
        </td>
        {regionals.map(r =>
          <td key={r.name}>
            {team.scores[r.name] || 0}
          </td>
        )}
        <td>
          {team.scores.total}
        </td>
      </tr>
    )
  }

  render() {
    const { scores, regionals, title, position, league } = this.props

    // +1 column for total, optional columns for position and league
    const positionCol = position ? 1 : 0
    const leagueCol = league ? 1 : 0

    const nameColSize = (100 - (regionals.length + 1 + positionCol + leagueCol) * ROUND_COLUMN_WIDTH_PC)

    const tdNameStyle = { width: `${nameColSize}%`}
    const tdStyle = { width: `${ROUND_COLUMN_WIDTH_PC}%`}

    // Get a unique array of teams (store found teams in names and corresponding structs in teams)
    const teams = scores.reduce((acc, curr) => {
      const { team, league: leagueName } = curr
      if (!acc.names.includes(team)) {
        acc.names.push(team)
        acc.teams.push({ team, league: leagueName })
      }
      return acc
    }, { teams: [], names: []})

    // TODO create selector
    // Map the unique team structs into a single data structure containing
    // - team details
    // - reduced scores struct for each regional and total score (default 0)
    const data = teams.teams.map(t => {
      return {
        name: t.team,
        league: t.league,
        scores: scores.filter(s =>
          s.team === t.team
        ).reduce((acc, s) => {
          const { score } = s
          return {
            ...acc,
            [s.regional]: score,
            total: acc.total + score
          }
        }, { total: 0 })
      }
    }).sort((i, j) => {
      return j.scores.total - i.scores.total
    })

    return data.length > 0
    ? (
        <Table
          className="my-3"
          hover
        >
          {title &&
            this.renderTableHeader(tdStyle, tdNameStyle)
          }
          <tbody>
            {data.map((team, i) =>
              this.renderTableRow(team, i)
            )}
          </tbody>
        </Table>
      )
    : <h6>No Results</h6>
  }
}

ScoreTable.propTypes = propTypes
ScoreTable.defaultProps = defaultProps

export default ScoreTable