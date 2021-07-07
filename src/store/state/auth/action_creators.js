import * as actions from './action_names'

export function loggedIn(username, firstname, lastname, email) {
  return {
    type: actions.LOGGED_IN,
    payload: {
      username,
      firstname,
      lastname,
      email
    }
  }
}

export function loggedOut() {
  return {
    type: actions.LOGGED_OUT
  }
}