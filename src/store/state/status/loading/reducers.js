import * as actions from '../action_names'

const initialState = 0

function loading(state = initialState, action) {
  switch (action.type) {
    case actions.SET_LOADING:
      return state + 1
    case actions.RESET_LOADING:
      return 0
    case actions.SET_LOADED:
      return state - 1
    default:
      return state
  }
}

export default loading