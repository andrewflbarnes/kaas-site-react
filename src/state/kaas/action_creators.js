import * as actions from './action_names'
import api from '../../api'
import * as kaas from '../../common/kaas_helper'

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

export function setRegionalScores(scores) {
  return {
    type: actions.SET_REGIONAL_SCORES,
    scores
  }
}

export function setFetchError(endpoint, error) {
  return {
    type: actions.SET_FETCH_ERROR,
    endpoint,
    error
  }
}

export function clearFetchError() {
  return {
    type: actions.CLEAR_FETCH_ERROR
  }
}

function fetchAndDispatch(dispatch, api, action) {
  api()
  .then(res => dispatch(action(res)))
  .catch(error => dispatch(setFetchError(api.name, error.message)))
}

export function getData() {
  return dispatch => {
    fetchAndDispatch(dispatch, api.getOrganisations, setOrganisations)
    fetchAndDispatch(dispatch, api.getCompetitions, setCompetitions)
    fetchAndDispatch(dispatch, api.getSeasons, setSeasons)
    fetchAndDispatch(dispatch, api.getLeagues, setLeagues)
    fetchAndDispatch(dispatch, api.getRegionals, setRegionals)
    fetchAndDispatch(dispatch, api.getRegionalScores, res => setRegionalScores(kaas.accumulateLeague(res)))
  }
}