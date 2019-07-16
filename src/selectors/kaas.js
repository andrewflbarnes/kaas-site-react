import { createSelector } from 'reselect'

export const getActiveFilters = state => state.filters.activeFilters
export const getOrganisations = state => state.kaas.organisations
export const getCompetitions = state => state.kaas.competitions
export const getScores = state => state.kaas.scores
export const getRegionals = state => state.kaas.regionals
export const getLeagues = state => state.kaas.leagues
export const getSeasons = state => state.kaas.seasons
export const getDivisions = state => state.kaas.divisions

export const getFilteredScores = createSelector(
  [getActiveFilters, getScores],
  (activeFilters, scores) => {
  const { competition, season, league } = activeFilters
    return scores.filter(e => {
      if (competition && e.competition !== competition) {
        return false
      }
      if (season && e.season !== season) {
        return false
      }
      if (league && e.league !== league) {
        return false
      }
  
      return true
    })
  }
)

export const getFilteredRegionals = createSelector(
  [getActiveFilters, getRegionals],
  (activeFilters, regionals) => {
  const { competition, season, league } = activeFilters
    return regionals.filter(e => {
      if (competition && e.competition !== competition) {
        return false
      }
      if (season && e.season !== season) {
        return false
      }
      if (league && e.league !== league) {
        return false
      }
  
      return true
    })
  }
)

export const getFilteredLeagues = createSelector(
  [getActiveFilters, getLeagues],
  (activeFilters, leagues) => {
    const { competition, league } = activeFilters
    return leagues.filter(e => {
      if (competition && e.competition !== competition) {
        return false
      }
      if (league && e.name !== league) {
        return false
      }

      return true
    })
  }
)

export const getFilteredSeasons = createSelector(
  [getActiveFilters, getSeasons],
  (activeFilters, seasons) => {
    const { competition, season } = activeFilters
    return seasons.filter(e => {
      if (competition && e.competition !== competition) {
        return false
      }
      if (season && e.name !== season) {
        return false
      }
  
      return true
    })
  }
)

export const getFilteredDivisions = createSelector(
  [getDivisions],
  divisions => divisions.map(d => { return { name: d }})
)