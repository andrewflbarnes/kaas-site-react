import React from 'react'
import { connect } from 'react-redux'
import { bool } from 'prop-types'
import selectors from '../../selectors'

const propTypes = {
  authenticated: bool
}

const defaultProps = {
  authenticated: false
}

export class RawAdministrationDashboard extends React.PureComponent {
  render() {
    const { authenticated } = this.props
    
    return (
      <>
        {authenticated
          ? <h1>Authorised</h1>
          : <h1>Unauthorised - please login</h1>
        }
      </>
    )
  }
}

RawAdministrationDashboard.propTypes = propTypes

RawAdministrationDashboard.defaultProps = defaultProps

const mapStateToProps = state => {
  return {
    authenticated: selectors.getAuthenticated(state)
  }
}
const AdministrationDashboard = connect(mapStateToProps)(RawAdministrationDashboard)

export default AdministrationDashboard