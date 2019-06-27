import React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import ScoresTable from '../ScoresTable'
import { havePropsOrStateChanged } from '../../common/kaas_helper';

export default class RegionalScoresClubTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['divisions', 'isCollapsed', 'regionals', 'title'])
  }

  render() {
    const { divisions, regionals, isCollapsed, title } = this.props

    return (
      <Collapse in={isCollapsed}>
        <div>
          {divisions.map(d =>
            <div key={d.name}>
              <h6 className="mt-1 mb-0 col-12" >{d.name}</h6>
              <ScoresTable regionals={regionals} teams={d.teams} title={title} />
            </div>
          )}
        </div>
      </Collapse>
    )
  }
}