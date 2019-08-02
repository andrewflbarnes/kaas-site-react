import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Keycloak from 'keycloak-js'
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import selectors from '../../selectors'
import * as actions from '../../store/state/auth/action_creators'

export class RawProfileLoginButton extends React.Component {
  constructor() {
    super()

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    const { loggedIn } = this.props
    const { keycloak } = window
    console.log('try log in')
    
    keycloak.login()
    .success(() => {
      console.log('logged in')

      localStorage.setItem('kc_token', keycloak.token);
      localStorage.setItem('kc_refreshToken', keycloak.refreshToken);

      loggedIn(keycloak)
    })
    .error(function(err) {
        console.error('failed to login');
        console.error(err);
    });
  }

  logout() {
    console.log('logout')

    localStorage.removeItem('kc_token')
    localStorage.removeItem('kc_refreshToken')

    window.keycloak.logout()
  }

  render() {
    const { authenticated, tokenParsed } = window.keycloak
    console.log(window.keycloak)
    console.log({ authenticated, tokenParsed })
    if (!authenticated) {
      return <LoginButton onClick={this.login} />
    }
  
    return <ProfileButton name={tokenParsed.preferred_username} onClick={this.logout} />
  }
}

const mapStateToProps = state => {
  return {
    authenticated: selectors.getAuthenticated(state),
    name: selectors.getUsername(state),
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

const ProfileLoginButton = connect(mapStateToProps, mapDispatchToProps)(RawProfileLoginButton)

export default ProfileLoginButton;