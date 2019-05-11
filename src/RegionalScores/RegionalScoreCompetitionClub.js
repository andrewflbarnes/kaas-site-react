import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default class RegionalScoreCompetitionClub extends React.Component{
  constructor(props) {
    super(props)

    this.state = {}

    this.updateCollapse = this.updateCollapse.bind(this)
  }


  updateCollapse(item) {
    const open = this.state[item]
    this.setState({
      [item]: !open
    })
  }

  render() {
    const {competition, season, league, clubs, title, regionals } = this.props
    // +1 for total
    const teamColSize = (100 - (regionals.length + 1) * 12.5)
    const nClass = { width: `${teamColSize}%`}
    const rClass = { width: "12.5%"}
    
    return (
      <>
        <h3 className="mt-3">{competition}:{season}:{league}</h3>
        {clubs.map(c =>
          <div key={c.name}>
            <Button size="lg" className="col-12" variant="none" onClick={() => this.updateCollapse(c.name)}>
              <h5>{c.name}</h5>
            </Button>
            <Collapse in={this.state[c.name]}>
              <div>
                {c.divisions.map(d =>
                  <div key={d.name}>
                    <h6 className="mt-1 mb-0 col-12" >{d.name}</h6>
                    {<Table className="col-lg-10 offset-lg-1" bordered variant="dark">
                      {title &&
                        <thead>
                          <tr>
                            <th style={nClass}>Name</th>
                            {regionals.map(r =>
                              <th style={rClass}>{r}</th>
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
                              <th style={rClass}>{t.scores[r]}</th>
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
          </div>
        )}
      </>
    )
  }
}