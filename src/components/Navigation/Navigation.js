import React from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar'
import StatusBar from '../StatusBar';
import { stateStatus } from '../../types'
import * as selectors from '../../selectors/auth'

const propTypes = {
  status: stateStatus.isRequired
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

const mapStateToProps = state => {
  const { status } = state

  return {
    status,
    keycloak: selectors.getAuthenticated(state)
  }
}

const Navigation = connect(mapStateToProps)(RawNavigation);

export default Navigation