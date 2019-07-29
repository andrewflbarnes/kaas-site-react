import * as actions from '../action_names'

const initialState = []

function errors(state = initialState, action) {
  const { error, endpoint } = action
  
  switch (action.type) {
    case actions.SET_FETCH_ERROR:
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

export default errors