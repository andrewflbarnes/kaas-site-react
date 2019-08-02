import React from 'react'
import { connect } from 'react-redux'
import selectors from '../../selectors'

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

const mapStateToProps = state => {
  return {
    authenticated: selectors.getAuthenticated(state)
  }
}
const AdministrationDashboard = connect(mapStateToProps)(RawAdministrationDashboard)

export default AdministrationDashboard