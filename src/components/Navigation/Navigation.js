import React from 'react'
import { connect } from 'react-redux'
import { bool } from 'prop-types'
import NavigationBar from './NavigationBar'
import StatusBar from '../StatusBar';
import { stateStatus } from '../../types'
import * as selectors from '../../selectors/auth'

const propTypes = {
  status: stateStatus.isRequired,
  authenticated: bool
}

const defaultProps = {
  authenticated: false
}

export class RawNavigation extends React.PureComponent {
  render() {
    const { status, authenticated } = this.props

    return (
      <>
        <NavigationBar authenticated={authenticated}/>
        <StatusBar {...status} />
      </>
    )
  }
}

RawNavigation.propTypes = propTypes
RawNavigation.defaultProps = defaultProps

const mapStateToProps = state => {
  const { status } = state

  return {
    status,
    authenticated: selectors.getAuthenticated(state)
  }
}

const Navigation = connect(mapStateToProps)(RawNavigation);

export default Navigation