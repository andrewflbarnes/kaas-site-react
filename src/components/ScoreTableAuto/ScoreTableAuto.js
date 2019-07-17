import React from 'react'
import { connect } from 'react-redux'
import collapsing from '../../hoc/Collapsing'
import { createStructuredSelector } from 'reselect'
import * as scoreSelectors from './selectors'
import ScoreTable from '../ScoreTable/ScoreTable';

export class RawScoreTableAuto extends React.Component {
  render() {
    const league = this.props.leagueName === 'All'
    return <ScoreTable league={league} {...this.props} />
  }
}

const mapStateToProps = createStructuredSelector({
  scores: scoreSelectors.filteredScores,
  regionals: scoreSelectors.filteredRegionals,
})

const ScoreTableAuto = connect(mapStateToProps)(collapsing(RawScoreTableAuto))

export default ScoreTableAuto