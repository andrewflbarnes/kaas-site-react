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

function fetchAndDispatch(dispatch, endpoint, ...next) {
  dispatch(statusActions.setLoading())
  endpoint()
    .then(res => {
      next.forEach(action => dispatch(action(res)))
    })
    .catch(error => dispatch(statusActions.setFetchError(endpoint.name, error.message)))
    .then(() => dispatch(statusActions.setLoaded()))
}

export function getData() {
  return dispatch => {
    dispatch(statusActions.resetLoading())
    fetchAndDispatch(dispatch, api.getOrganisations, setOrganisations)
    fetchAndDispatch(dispatch, api.getCompetitions, setCompetitions)
    fetchAndDispatch(dispatch, api.getSeasons, setSeasons)
    fetchAndDispatch(dispatch, api.getLeagues, setLeagues)
    fetchAndDispatch(dispatch, api.getRegionals, setRegionals)
    fetchAndDispatch(dispatch, api.getRegionalScores,
      res => setScores(res),
      res => setDivisions(kaas.accumulateDivisions(res)),
    )
  }
}