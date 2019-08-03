import * as actions from './action_names'

const initialState = {
  authenticated: false,
}

function auth(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actions.LOGGED_IN: {
      const { username, firstname, lastname, email } = payload
      return {
        authenticated: true,
        username,
        firstname,
        lastname,
        email,
      }
    }
    case actions.LOGGED_OUT:
      return {
        authenticated: false,
      }
    default:
      return state
  }
}

export default auth