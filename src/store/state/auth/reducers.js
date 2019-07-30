import * as actions from './action_names'

const initialState = {
  loggedIn: false
}

function auth(state = initialState, action) {
  switch (action.type) {
    case actions.LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      }
    case actions.LOGGED_OUT:
      return {
        ...state,
        loggedIn: false
      }
    default:
      return state
  }
}

export default auth