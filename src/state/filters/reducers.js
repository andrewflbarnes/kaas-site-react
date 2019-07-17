import * as actions from './action_names'
import * as kaasActions from '../kaas/action_names'

const initialState = {
  activeFilters: {}
}

function getCurrentName(elements) {
  return elements.sort((i, j) =>
    j.name.localeCompare(i.name)
  )[0].name
}

function filters(state = initialState, action) {
  const { activeFilters } = state

  switch (action.type) {
    case kaasActions.SET_ORGANISATIONS:
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          "organisation": getCurrentName(action.organisations)
        }
      }
    case kaasActions.SET_COMPETITIONS:
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          "competition": getCurrentName(action.competitions)
        }
      }
    case kaasActions.SET_SEASONS:
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          "season": getCurrentName(action.seasons)
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