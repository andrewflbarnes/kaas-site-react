import * as actions from './action_names'

export function setFetchError(error) {
  return {
    type: actions.SET_FETCH_ERROR,
    error
  }
}

export function clearFetchError() {
  return {
    type: actions.CLEAR_FETCH_ERROR
  }
}