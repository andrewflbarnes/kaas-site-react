import * as actions from './action_names'

const initialState = {
  scores: [],
  organisations: [],
  competitions: [],
  leagues: [],
  seasons: [],
  regionals: []
}

function kaas(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SCORES:
      return {
        ...state,
        scores: action.scores
      }
    case actions.SET_HIERARCHY:
      return {
        ...state,
        hierarchy: action.hierarchy
      }
    case actions.SET_ORGANISATIONS:
      return {
        ...state,
        organisations: action.organisations
      }
    case actions.SET_COMPETITIONS:
      return {
        ...state,
        competitions: action.competitions
      }
    case actions.SET_SEASONS:
      return {
        ...state,
        seasons: action.seasons
      }
    case actions.SET_DIVISIONS:
      return {
        ...state,
        divisions: action.divisions
      }
    case actions.SET_LEAGUES:
      return {
        ...state,
        leagues: action.leagues
      }
    case actions.SET_REGIONALS:
      return {
        ...state,
        regionals: action.regionals
      }
    default:
      return state
  }
}

export default kaas