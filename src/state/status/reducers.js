import * as actions from './action_names'

const initialState = []

function status(state = initialState, action) {
  switch (action.type) {
    case actions.SET_FETCH_ERROR:
      const { error, endpoint } = action
      return [
        ...state,
        {
          endpoint,
          error
        }
      ]
    case actions.CLEAR_FETCH_ERROR:
      return initialState
    default:
      return state
  }
}

export default status