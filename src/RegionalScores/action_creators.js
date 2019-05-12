import {
  SET_REGIONAL_SCORES,
  SET_COMPETITIONS,
  SET_SEASONS,
  SET_LEAGUES,
  SET_REGIONALS
} from './action_names'

export function setRegionalScores(scores) {
  return {
    type: SET_REGIONAL_SCORES,
    scores
  }
}

export function setCompetitions(competitions) {
  return {
    type: SET_COMPETITIONS,
    competitions
  }
}

export function setSeasons(seasons) {
  return {
    type: SET_SEASONS,
    seasons
  }
}

export function setLeagues(leagues) {
  return {
    type: SET_LEAGUES,
    leagues
  }
}

export function setRegionals(regionals) {
  return {
    type: SET_REGIONALS,
    regionals
  }
}