import * as actions from './action_names'
import * as statusActions from '../status/action_creators'
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

function fetchAndDispatch(dispatch, api, action) {
  dispatch(statusActions.setLoading())
  api()
    .then(res => dispatch(action(res)))
    .catch(error => dispatch(statusActions.setFetchError(api.name, error.message)))
    .then(res => dispatch(statusActions.setLoaded()))
}

export function getData() {
  return dispatch => {
    dispatch(statusActions.resetLoading())
    fetchAndDispatch(dispatch, api.getOrganisations, setOrganisations)
    fetchAndDispatch(dispatch, api.getCompetitions, setCompetitions)
    fetchAndDispatch(dispatch, api.getSeasons, setSeasons)
    fetchAndDispatch(dispatch, api.getLeagues, setLeagues)
    fetchAndDispatch(dispatch, api.getRegionals, setRegionals)
    fetchAndDispatch(dispatch, api.getRegionalScores, res => setRegionalScores(kaas.accumulateLeague(res)))
  }
}