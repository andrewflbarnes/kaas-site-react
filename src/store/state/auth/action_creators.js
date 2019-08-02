import * as actions from './action_names'

export function loggedIn(keycloak) {
  return {
    type: actions.LOGGED_IN,
    keycloak
  }
}

export function loggedOut() {
  return {
    type: actions.LOGGED_OUT
  }
}