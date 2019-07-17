import * as actions from './action_names'

export function updateNextFilter(type, value) {
  return {
    type: actions.UPDATE_FILTER,
    filter: {
      type,
      value
    }
  }
}

export function resetFilters() {
  return {
    type: actions.RESET_FILTERS
  }
}