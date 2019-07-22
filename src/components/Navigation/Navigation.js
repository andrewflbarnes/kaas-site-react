import React from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar'
import StatusBar from '../StatusBar';
import { stateStatus } from '../../types'

const propTypes = {
  status: stateStatus.isRequired
}

export class RawNavigation extends React.PureComponent {
  render() {
    const { status } = this.props

    return (
      <>
        <NavigationBar/>
        <StatusBar {...status} />
      </>
    )
  }
}

RawNavigation.propTypes = propTypes

const mapStateToProps = state => {
  const { status } = state

  return {
    status
  }
}

const Navigation = connect(mapStateToProps)(RawNavigation);

export default Navigation