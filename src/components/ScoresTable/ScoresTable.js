import React from 'react'
import Table from 'react-bootstrap/Table'
import { havePropsOrStateChanged } from '../../common/kaas_helper';

const ROUND_COLUMN_WIDTH_PC = 12.5

export default class ScoresTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['regionals', 'title'])
  }

  render() {
    const { scores, regionals, title } = this.props

    // +1 for total
    const teamColSize = (100 - (regionals.length + 1) * ROUND_COLUMN_WIDTH_PC)
    const nClass = { width: `${teamColSize}%`}
    const rClass = { width: `${ROUND_COLUMN_WIDTH_PC}%`}

    const teams = scores.reduce((acc, curr) => {
      acc.includes(curr.team) || acc.push(curr.team)
      return acc
    }, [])

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
        <Table bordered variant="dark">
          {title &&
            <thead>
              <tr>
                <th style={nClass}>Name</th>
                {regionals.map(r =>
                  <th key={r.name} style={rClass}>{r.name}</th>
                )}
                <th style={rClass}>Total</th>
              </tr>
            </thead>
          }
          <tbody>
            {data.map(t =>
              <tr key={t.name}>
                <td style={nClass}>{t.name}</td>
                {regionals.map(r =>
                    <th key={r.name} style={rClass}>{t.scores[r.name] || 0}</th>
                )}
                <th style={rClass}>{t.scores.total}</th>
              </tr>
            )}
          </tbody>
        </Table>
      )
    : <h6>No Results</h6>
  }
}