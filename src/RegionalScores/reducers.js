import {
  SET_REGIONAL_SCORES,
  SET_COMPETITIONS,
  SET_SEASONS,
  SET_LEAGUES,
  SET_REGIONALS
} from './action_names'

const initialState = {
  scores: [],
  leagues: [],
  seasons: [],
  competitions: [],
  regionals: []
}

function regionalScores(state = initialState, action) {
  switch (action.type) {
    case SET_REGIONAL_SCORES:
      return {
        ...state,
        scores: action.scores
      }
    case SET_COMPETITIONS:
      return {
        ...state,
        competitions: action.competitions
      }
    case SET_SEASONS:
      return {
        ...state,
        seasons: action.seasons
      }
    case SET_LEAGUES:
      return {
        ...state,
        leagues: action.leagues
      }
    case SET_REGIONALS:
      return {
        ...state,
        regionals: action.regionals
      }
    default:
      return state
  }
}

export default regionalScores