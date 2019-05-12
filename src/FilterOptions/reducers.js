import {
  UPDATE_NEXT_FILTER,
  APPLY_FILTERS,
  CANCEL_FILTERS,
  RESET_FILTERS
} from './action_names'

const initialState = {
  activeFilters: [],
  nextFilters: [],
}

function filters(state = initialState, action) {
  const { activeFilters, nextFilters } = state

  switch (action.type) {
    case UPDATE_NEXT_FILTER:
      const { filter } = action
      return {
        ...state,
        nextFilters: {
          ...nextFilters,
          [filter.type]: filter.value
        }
      }
    case APPLY_FILTERS:
      return {
        ...state,
        activeFilters: nextFilters,
      }
    case CANCEL_FILTERS:
      return {
        ...state,
        nextFilters: activeFilters,
      }
    case RESET_FILTERS:
      return {
        ...state,
        nextFilters: [],
        activeFilters: [],
      }
    default:
      return state
  }
}

export default filters