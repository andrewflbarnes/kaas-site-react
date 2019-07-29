import * as actions from './action_names'
import * as selectors from '../../../selectors/kaas'
import constants from '../../../common/constants'

export function updateNextFilter(type, value) {
  return {
    type: actions.UPDATE_FILTER,
    filter: {
      type,
      value
    }
  }
}

// Convenience and guarding
export function updateOrganisationFilter(organisation) {
  return updateNextFilter('organisation', organisation)
}

export function updateCompetitionFilter(competition) {
  return updateNextFilter('competition', competition)
}

export function updateSeasonFilter(season) {
  return updateNextFilter('season', season)
}

// Cascade
const DUMMY = { name: constants.FILTER_NONE}

export function updateCompetitionFilterCascade(competition) {
  return (dispatch, getState) => {
    let state = getState()
    const currentCompetition = selectors.getActiveFilterCompetition(state)
    if (currentCompetition !== competition) {
      dispatch(updateCompetitionFilter(competition))
      state = getState()
      const season = selectors.getFilteredSeasons(state)[0] || DUMMY
      dispatch(updateSeasonFilter(season.name))
    }
  }
}

export function updateOrganisationFilterCascade(organisation) {
  return (dispatch, getState) => {
    let state = getState()
    const currentOrganisation = selectors.getActiveFilterOrganisation(state)
    if (currentOrganisation !== organisation) {
      dispatch(updateOrganisationFilter(organisation))
      state = getState()
      const competition = selectors.getFilteredCompetitions(state)[0] || DUMMY
      dispatch(updateCompetitionFilter(competition.name))
      state = getState()
      const season = selectors.getFilteredSeasons(state)[0] || DUMMY
      dispatch(updateSeasonFilter(season.name))
    }
  }
}