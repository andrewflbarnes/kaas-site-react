import React from 'react';
import { connect } from 'react-redux'
import { string, bool } from 'prop-types'
import selectors from '../../selectors'

const propTypes = {
  authenticated: bool.isRequired,
  username: string.isRequired,
  firstname: string.isRequired,
  lastname: string.isRequired,
  email: string,
}

const defaultProps = {
  email: '-'
}

const RawProfile = React.memo(({ authenticated, username, firstname, lastname, email }) => {
  if (!authenticated) {
    return (
      <h4>Please login</h4>
    )
  }

  return (
    <>
      <h4>{username}{"'"}s Profile</h4>
      <p>Name: {firstname} {lastname}</p>
      <p>Contact: {email}</p>
    </>
  )
})

RawProfile.propTypes = propTypes
RawProfile.defaultProps = defaultProps

const mapStateToProps = state => {
  return {
    authenticated: selectors.getAuthenticated(state),
    username: selectors.getAuthUsername(state),
    firstname: selectors.getAuthFirstname(state),
    lastname: selectors.getAuthLastrname(state),
    email: selectors.getAuthEmail(state),
  }
}
const Profile = connect(mapStateToProps)(RawProfile)

export default Profile