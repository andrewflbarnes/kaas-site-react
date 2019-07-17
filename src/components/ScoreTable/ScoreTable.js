import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table'
import { havePropsOrStateChanged } from '../../common/kaas_helper';

const ROUND_COLUMN_WIDTH_PC = 10

export default class ScoreTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['scores', 'regionals', 'title', 'position', 'league'])
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
      const { team, league } = curr
      acc.names.includes(team) ||
        acc.names.push(team) && acc.teams.push({ team, league })
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

  renderTableHeader(defaultStyle, nameStyle) {
    const { position, league, regionals } = this.props

    return (
      <thead>
        <tr>
          {league &&
            this.renderTh('', defaultStyle)
          }
          {position &&
            this.renderTh('Pos.', defaultStyle)
          }
          {this.renderTh('Name', nameStyle)}
          {regionals.map(r =>
            this.renderTh(r.name, defaultStyle)
          )}
          {this.renderTh('Total', defaultStyle)}
        </tr>
      </thead>
    )
  }

  renderTh(text, style = {}, className = '') {
    return (
      <th
        key={text}
        style={style}
        className={className + ' px-0'}>
        {text}
      </th>
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
}