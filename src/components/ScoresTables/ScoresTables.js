import React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import ScoresTable from '../ScoresTable'
import { havePropsOrStateChanged } from '../../common/kaas_helper';

export default class ScoresTables extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps, ['scores', 'divisions', 'isCollapsed', 'regionals', 'title'])
  }

  render() {
    const { scores, divisions, regionals, isCollapsed, title } = this.props

    console.log(regionals)

    return (
      <Collapse in={isCollapsed}>
        <div>
          {divisions.map(d =>
            <div key={d}>
              <h6 className="mt-1 mb-0 col-12" >{d}</h6>
              <ScoresTable regionals={regionals} scores={scores.filter(s => s.division === d)} title={title} />
            </div>
          )}
        </div>
      </Collapse>
    )
  }
}