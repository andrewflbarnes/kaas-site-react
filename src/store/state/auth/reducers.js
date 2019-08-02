import * as actions from './action_names'

const initialState = {
  authenticated: false,
  name: ''
}

function auth(state = initialState, action) {
  switch (action.type) {
    case actions.LOGGED_IN: {
      const { keycloak } = action
      return {
        authenticated: true,
        name: keycloak.tokenParsed.preferred_username
      }
    }
    case actions.LOGGED_OUT:
      return {
        authenticated: false,
        name: ''
      }
    default:
      return state
  }
}

export default auth