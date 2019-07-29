import { createSelector } from 'reselect'
import constants from '../common/constants'

export const getActiveFilters = state => state.filters.activeFilters
export const getActiveFilterOrganisation = state => state.filters.activeFilters.organisation
export const getActiveFilterCompetition = state => state.filters.activeFilters.competition
export const getActiveFilterSeason = state => state.filters.activeFilters.season
export const getOrganisations = state => state.kaas.organisations
export const getCompetitions = state => state.kaas.competitions
export const getScores = state => state.kaas.scores
export const getRegionals = state => state.kaas.regionals
export const getLeagues = state => state.kaas.leagues
export const getSeasons = state => state.kaas.seasons
export const getDivisions = state => state.kaas.divisions

// helpers

function excludeElement(element, match) {
  return match && element !== match && match !== constants.FILTER_ALL
}

// Filtered selectors return filtered results EXCLUDING self filtering
// e.g. filtered seasons are returned filtering against organisation and competition
// In general a filtered selector should only be available for an element which itself can be applied ads a filter

// Active selectors return filtered results INCLUDING self filtering
// e.g. active seasons are returned filtering against organisation, competition AND SEASON

// F I L T E R E E D   S E L E C T O R S

export const getFilteredCompetitions = createSelector(
  [getActiveFilters, getCompetitions],
  (activeFilters, competitions) => {
    const { organisation } = activeFilters
    return competitions.filter(e => {
      return !excludeElement(e.organisation, organisation)
    })
  }
)

export const getFilteredSeasons = createSelector(
  [getActiveFilters, getSeasons],
  (activeFilters, seasons) => {
    const { competition } = activeFilters
    return seasons.filter(e => {
      return !excludeElement(e.competition, competition)
    }).sort((i,j) => {
      return j.name.localeCompare(i.name)
    })
  }
)

// A C T I V E   S E L E C T O R S

function getActiveElements(activeFilters, elements) {
  const { competition, season, league } = activeFilters
  return elements.filter(e => {
    if (season === constants.FILTER_NONE) {
      return false
    }

    if (excludeElement(e.competition, competition)) {
      return false
    }
    if (excludeElement(e.season, season)) {
      return false
    }
    if (league && e.league !== league) {
      return false
    }

    return true
  })
}

export const getActiveScores = createSelector(
  [getActiveFilters, getScores],
  getActiveElements
)

export const getActiveRegionals = createSelector(
  [getActiveFilters, getRegionals],
  getActiveElements
)

export const getActiveDivisions = createSelector(
  [getActiveFilters, getDivisions],
  (activeFilters, divisions) => {
    const { competition, division } = activeFilters
    return divisions.filter(e => {
      if (competition === constants.FILTER_NONE) {
        return false
      }

      if (excludeElement(e.competition, competition)) {
        return false
      }
      if (division && e.name !== division) {
        return false
      }

      return true
    })
  }
)

export const getActiveLeagues = createSelector(
  [getActiveFilters, getLeagues],
  (activeFilters, leagues) => {
    const { competition, league } = activeFilters
    return leagues.filter(e => {
      if (competition === constants.FILTER_NONE) {
        return false
      }

      if (excludeElement(e.competition, competition)) {
        return false
      }
      if (league && e.name !== league) {
        return false
      }

      return true
    })
  }
)

export const getActiveCompetitions = createSelector(
  [getActiveFilterCompetition, getFilteredCompetitions],
  (competition, competitions) => {
    if (competition === constants.FILTER_NONE) {
      return []
    } else if (competition === constants.FILTER_ALL) {
      return competitions
    }

    return competitions.filter(e =>
      !competition || e.name === competition
    )
  }
)

export const getActiveSeasons = createSelector(
  [getActiveFilterSeason, getFilteredSeasons],
  (season, seasons) => {
    if (season === constants.FILTER_NONE) {
      return []
    } else if (season === constants.FILTER_ALL) {
      return seasons
    }

    return seasons.filter(e =>
      !season || e.name === season
    )
  }
)