import React from 'react'
import { connect } from 'react-redux'
import { havePropsOrStateChanged } from '../../common/kaas_helper';
import collapsing from '../../hoc/Collapsing'
import { createStructuredSelector } from 'reselect'
import * as scoreSelectors from './selectors'
import ScoreTable from '../ScoreTable/ScoreTable';

export class RawScoreTableAuto extends React.Component {
  shouldComponentUpdate(nextProps) {
    return havePropsOrStateChanged(this.props, nextProps,
      ['scores', 'regionals', 'title'])
  }

  render() {
    const { scores, regionals, title } = this.props

    return <ScoreTable scores={scores} regionals={regionals} title={title} />
  }
}

const mapStateToProps = createStructuredSelector({
  scores: scoreSelectors.filteredScores,
  regionals: scoreSelectors.filteredRegionals,
})

const ScoreTableAuto = connect(mapStateToProps)(collapsing(RawScoreTableAuto))

export default ScoreTableAuto