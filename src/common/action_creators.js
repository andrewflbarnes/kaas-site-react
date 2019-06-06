import {
  SET_REGIONAL_SCORES,
  SET_ORGANISATIONS,
  SET_COMPETITIONS,
  SET_SEASONS,
  SET_LEAGUES,
  SET_REGIONALS
} from './action_names'
import api from '../api'
import * as kaas from './kaas_helper'

export function setOrganisations(organisations) {
  return {
    type: SET_ORGANISATIONS,
    organisations
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

export function setRegionalScores(scores) {
  return {
    type: SET_REGIONAL_SCORES,
    scores
  }
}

export function getData() {
  return dispatch => {
    api.getOrganisations().then(organisations => {
      dispatch(setOrganisations(organisations))
    })
    api.getCompetitions().then(competitions => {
      dispatch(setCompetitions(competitions.map(c => c.name)))
    })
    api.getSeasons().then(seasons => {
      dispatch(setSeasons(seasons.map(s => s.name)))
    })
    api.getLeagues().then(leagues => {
      dispatch(setLeagues(leagues.map(l => l.name)))
    })
    api.getRegionals().then(regionals => {
      dispatch(setRegionals(regionals))
    })
    api.getRegionalScores().then(regionalScores => {
      dispatch(setRegionalScores(
        kaas.accumulateLeague(regionalScores)
      ))
    })
  }
}