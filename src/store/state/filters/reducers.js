import * as actions from './action_names'

const initialState = {
  activeFilters: {}
}

function filters(state = initialState, action) {
  const { activeFilters } = state

  switch (action.type) {
    case actions.UPDATE_FILTER: {
      const { type, value } = action.filter
      if (activeFilters[type] === value) {
        return state
      }
      
      return {
        ...state,
        activeFilters: {
          ...activeFilters,
          [type]: value
        }
      }
    }
    default:
      return state
  }
}

export default filters