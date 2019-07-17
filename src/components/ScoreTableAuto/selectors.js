import { createSelector } from 'reselect'
import * as kaasSelectors from '../../selectors/kaas'

const getSeasonName = (_, props) => props.seasonName
const getLeagueName = (_, props) => {
  const { leagueName } = props
  if (leagueName === "All") {
    return undefined
  }
  return leagueName
}
const getDivisionName = (_, props) => props.divisionName
const getClubName = (_, props) => props.clubName

export const filteredScores = createSelector(
  [getSeasonName, getLeagueName, getDivisionName, getClubName, kaasSelectors.getFilteredScores],
  (seasonName, leagueName, divisionName, clubName, scores) => {
    return scores.filter(s =>
      (!divisionName || s.division === divisionName) &&
      (!leagueName || s.league === leagueName) &&
      (!seasonName || s.season === seasonName) &&
      (!clubName || s.club === clubName)
    )
  }
)

export const filteredRegionals = createSelector(
  [getSeasonName, getLeagueName, kaasSelectors.getFilteredRegionals],
  (seasonName, leagueName, regionals) => {
    return regionals.filter(regional =>
      (!leagueName || regional.league === leagueName) &&
      (!seasonName || regional.season === seasonName)
    ).filter((regional, _, check) =>
      check.find(r => r.name === regional.name) === regional
    )
  }
)