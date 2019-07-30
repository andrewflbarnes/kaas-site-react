import * as actions from './action_names'

export function loggedIn() {
  return {
    type: actions.LOGGED_IN
  }
}

export function loggedOut() {
  return {
    type: actions.LOGGED_OUT
  }
}