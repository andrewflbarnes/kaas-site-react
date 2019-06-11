import {
  UPDATE_NEXT_FILTER,
  APPLY_FILTERS,
  CANCEL_FILTERS,
  RESET_FILTERS,
} from './action_names'

export function updateNextFilter(type, value) {
  return {
    type: UPDATE_NEXT_FILTER,
    filter: {
      type,
      value
    }
  }
}

export function applyFilters() {
  return {
    type: APPLY_FILTERS
  }
}

export function cancelFilters() {
  return {
    type: CANCEL_FILTERS
  }
}

export function resetFilters() {
  return {
    type: RESET_FILTERS
  }
}