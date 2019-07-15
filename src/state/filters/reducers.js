import * as actions from './action_names'
import * as kaasActions from '../kaas/action_names'

const initialState = {
  activeFilters: {}
}

function filters(state = initialState, action) {
  const { activeFilters } = state

  switch (action.type) {
    case kaasActions.SET_ORGANISATIONS:
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          "organisation": action.organisations[0].name
        }
      }
    case kaasActions.SET_COMPETITIONS:
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          "competition": action.competitions[0].name
        }
      }
    case kaasActions.SET_SEASONS:
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          "season": action.seasons[0].name
        }
      }
    case actions.UPDATE_FILTER:
      const { filter } = action
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          [filter.type]: filter.value
        }
      }
    case actions.RESET_FILTERS:
      // return {
      //   ...state,
      //   nextFilters: {},
      //   activeFilters: {},
      // }
      return state
    default:
      return state
  }
}

export default filters