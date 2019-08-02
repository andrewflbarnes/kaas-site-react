import React from 'react';
import { connect } from 'react-redux'
import selectors from '../../selectors'

const RawProfile = React.memo(({ authenticated, name }) => {
  if (!authenticated) {
    return (
      <h4>Please login</h4>
    )
  }

  return (
    <h4>{name}{"'"}s Profile</h4>
  )
})

const mapStateToProps = state => {
  return {
    authenticated: selectors.getAuthenticated(state),
    name: selectors.getUsername(state)
  }
}
const Profile = connect(mapStateToProps)(RawProfile)

export default Profile