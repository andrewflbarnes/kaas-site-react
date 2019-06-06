import React from 'react'
import Table from 'react-bootstrap/Table'
import Collapse from 'react-bootstrap/Collapse'

const ROUND_COLUMN_WIDTH_PC = 12.5

export default function RegionalScoresClubRow({ club, regionals, isCollapsed, title }) {
  // +1 for total
  const teamColSize = (100 - (regionals.length + 1) * ROUND_COLUMN_WIDTH_PC)
  const nClass = { width: `${teamColSize}%`}
  const rClass = { width: `${ROUND_COLUMN_WIDTH_PC}%`}
  
  return (
    <Collapse in={isCollapsed}>
      <div>
        {club.divisions.map(d =>
          <div key={d.name}>
            <h6 className="mt-1 mb-0 col-12" >{d.name}</h6>
            {<Table bordered variant="dark">
              {title &&
                <thead>
                  <tr>
                    <th style={nClass}>Name</th>
                    {regionals.map(r =>
                      <th style={rClass}>{r.name}</th>
                    )}
                    <th style={rClass}>Total</th>
                  </tr>
                </thead>
              }
              <tbody>
                {d.teams.map(t => 
                  <tr key={t.name}>
                    <td style={nClass}>{t.name}</td>
                    {regionals.map(r =>
                        <th key={r.name} style={rClass}>{t.scores[r.name]}</th>
                    )}
                    <th style={rClass}>{t.scores.total}</th>
                  </tr>
                )}
              </tbody>
            </Table>}
          </div>
        )}
      </div>
    </Collapse>
  )
}