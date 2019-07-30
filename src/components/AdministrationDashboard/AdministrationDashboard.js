import React from 'react'
import { connect } from 'react-redux'
import { bool } from 'prop-types'
import { createStructuredSelector } from 'reselect';
import * as selectors from '../../selectors/auth'

const propTypes = {
  loggedIn: bool
}

const defaultProps = {
  loggedIn: false
}

// Mobile device navbar which expands to a desktop navbar at the md breakpoint
// The somewhat convoluted layout ensures
// - correct center alignment in mobile layout
// - correct collapse transitioning in mobile layout
// - correct start/end alignment in desktop layout
const RawAdministrationDashboard = React.memo(({ loggedIn }) => {
  return (
    <>
      {loggedIn
        ? <h1>Authorised</h1>
        : <h1>Unauthorised - please login</h1>
      }
    </>
  )
})

RawAdministrationDashboard.propTypes = propTypes
RawAdministrationDashboard.defaultProps = defaultProps

const mapStateToProps = createStructuredSelector({
  loggedIn: selectors.getLoggedIn
})

const AdministrationDashboard = connect(mapStateToProps)(RawAdministrationDashboard)

export default AdministrationDashboard