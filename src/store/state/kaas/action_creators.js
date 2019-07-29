import * as actions from './action_names'

export function setOrganisations(organisations) {
  return {
    type: actions.SET_ORGANISATIONS,
    organisations
  }
}

export function setCompetitions(competitions) {
  return {
    type: actions.SET_COMPETITIONS,
    competitions
  }
}

export function setSeasons(seasons) {
  return {
    type: actions.SET_SEASONS,
    seasons
  }
}

export function setDivisions(divisions) {
  return {
    type: actions.SET_DIVISIONS,
    divisions
  }
}

export function setLeagues(leagues) {
  return {
    type: actions.SET_LEAGUES,
    leagues
  }
}

export function setRegionals(regionals) {
  return {
    type: actions.SET_REGIONALS,
    regionals
  }
}

export function setScores(scores) {
  return {
    type: actions.SET_SCORES,
    scores
  }
}