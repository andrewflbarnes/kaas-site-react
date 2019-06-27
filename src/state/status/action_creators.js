import * as actions from './action_names'

export function setFetchError(endpoint, error) {
  return {
    type: actions.SET_FETCH_ERROR,
    endpoint,
    error
  }
}

export function clearFetchError() {
  return {
    type: actions.CLEAR_FETCH_ERROR
  }
}

export function resetLoading() {
  return {
    type: actions.RESET_LOADING
  }
}

export function setLoading() {
  return {
    type: actions.SET_LOADING
  }
}

export function setLoaded() {
  return {
    type: actions.SET_LOADED
  }
}