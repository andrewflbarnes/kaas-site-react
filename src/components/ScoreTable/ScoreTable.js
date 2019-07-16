import React from 'react'
import Table from 'react-bootstrap/Table'
import { havePropsOrStateChanged } from '../../common/kaas_helper';

const ROUND_COLUMN_WIDTH_PC = 12.5

export default class ScoreTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['scores', 'regionals', 'title', 'position'])
  }

  render() {
    const { scores, regionals, title, position } = this.props

    // +1 for total, optional col for position
    const positionCol = position ? 1 : 0
    const teamColSize = (100 - (regionals.length + 1 + positionCol) * ROUND_COLUMN_WIDTH_PC)
    const nClass = { width: `${teamColSize}%`}
    const rClass = { width: `${ROUND_COLUMN_WIDTH_PC}%`}

    const teams = scores.reduce((acc, curr) => {
      acc.includes(curr.team) || acc.push(curr.team)
      return acc
    }, [])

    // TODO create selector
    const data = teams.map(t => {
      return {
        name: t,
        scores: scores.filter(s =>
          s.team === t
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
            <thead>
              <tr>
                {position && <th style={rClass}>Pos.</th>}
                <th style={nClass}>Name</th>
                {regionals.map(r =>
                  <th key={r.name} style={rClass}>{r.name}</th>
                )}
                <th style={rClass}>Total</th>
              </tr>
            </thead>
          }
          <tbody>
            {data.map((t, i) =>
              <tr key={t.name}>
                {position && <td style={rClass}>{i + 1}</td>}
                <td style={nClass}>{t.name}</td>
                {regionals.map(r =>
                    <td key={r.name} style={rClass}>{t.scores[r.name] || 0}</td>
                )}
                <td style={rClass}>{t.scores.total}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )
    : <h6>No Results</h6>
  }
}