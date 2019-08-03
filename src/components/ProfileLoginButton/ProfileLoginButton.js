import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { string, bool, func } from 'prop-types'
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import selectors from '../../selectors'
import * as actions from '../../store/state/auth/action_creators'
import { ssoLogin, ssoLogout } from '../../providers/sso'

const propTypes = {
  loggedIn: func.isRequired,
  authenticated: bool.isRequired,
  username: string
}

const defaultProps = {
  username: ''
}

export class RawProfileLoginButton extends React.Component {
  constructor() {
    super()

    this.login = this.login.bind(this)
  }

  login() {
    const { loggedIn } = this.props

    ssoLogin().then(({ authenticated, username }) => {
      if (authenticated) {
        loggedIn(username)
      }
    })
  }

  render() {
    const { authenticated, username } = this.props

    if (!authenticated) {
      return <LoginButton onClick={this.login} />
    }
  
    return <ProfileButton username={username} onClick={ssoLogout} />
  }
}

RawProfileLoginButton.propTypes = propTypes
RawProfileLoginButton.defaultProps = defaultProps

const mapStateToProps = state => {
  return {
    authenticated: selectors.getAuthenticated(state),
    username: selectors.getAuthUsername(state),
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

const ProfileLoginButton = connect(mapStateToProps, mapDispatchToProps)(RawProfileLoginButton)

export default ProfileLoginButton;