import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { string } from 'prop-types';
import collapsing from '../../hoc/Collapsing'
import * as scoreSelectors from './selectors'
import ScoreTable from '../ScoreTable/ScoreTable';

const propTypes = {
  leagueName: string.isRequired
}

export class RawScoreTableAuto extends React.PureComponent {
  render() {
    const { leagueName } = this.props
    const league = leagueName === 'All'
    return <ScoreTable league={league} {...this.props} />
  }
}

RawScoreTableAuto.propTypes = propTypes

const mapStateToProps = createStructuredSelector({
  scores: scoreSelectors.filteredScores,
  regionals: scoreSelectors.filteredRegionals,
})

const ScoreTableAuto = connect(mapStateToProps)(collapsing(RawScoreTableAuto))

export default ScoreTableAuto