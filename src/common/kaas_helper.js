/**
 * Takes a flat structure of scores and converts them to a nested one
 * 
 * @param {*} scores 
 */
export function accumulateLeague(scores) {
  return scores.sort((i, j) => {
    const { competition: iCompetition, season: iSeason, league: iLeague } = i
    const { competition: jCompetition, season: jSeason, league: jLeague } = j

    let result = iCompetition.localeCompare(jCompetition)
    if (result === 0) {
      // Most recent first so reverse comparison
      result = jSeason.localeCompare(iSeason)
      if (result === 0) {
        result = iLeague.localeCompare(jLeague)
      }
    }

    return result
  }).reduce((acc, cur) => {
    const { competition, season, league, regional, division, club, team, score } = cur

    let index = acc.findIndex(e =>
      e.competition === competition &&
      e.season === season &&
      e.league === league
    )

    const newTeam = {
      name: team,
      scores: {
        [regional]: score,
        total: score
      }
    }

    const newDivision = {
      name: division,
      teams: [
        newTeam
      ]
    }

    const newClub = {
      name: club,
      divisions: [
        newDivision
      ]
    }

    if (index < 0) {
      acc.push({
        competition,
        season,
        league,
        clubs: [
          newClub
        ],
      })
    } else {
      const clubs = acc[index].clubs
      const clubIndex = clubs.findIndex(e =>
        e.name === club  
      )

      if (clubIndex < 0) {
        clubs.push(newClub)
      } else {
        const divisions = clubs[clubIndex].divisions
        const divisionIndex = divisions.findIndex(e =>
          e.name === division  
        )

        if (divisionIndex < 0) {
          divisions.push(newDivision)
        } else {
          const teams = divisions[divisionIndex].teams
          const teamIndex = teams.findIndex(e =>
            e.name === team
          )
  
          if (teamIndex < 0) {
            teams.push(newTeam)
          } else {
            const scores = teams[teamIndex].scores
            const { total } = scores
            teams[teamIndex].scores = {
              ...scores,
              [regional]: score,
              total: total + score
            }
          }
        }
      }
    }
    return acc;
  }, [])
}

/**
 * Finds unique values fo a field with the giving name in an array of objects
 * and returns them ordered
 * 
 * @param {*} objects 
 * @param {*} name 
 * @param {*} reverseOrder 
 */
export function reduceToUnique(objects, name, reverseOrder = false) {
  return objects.map(s =>
    s[name]
  ).filter((value, index, self) =>
    self.indexOf(value) === index
  ).sort((i, j) =>
    reverseOrder ? j.localeCompare(i) : i.localeCompare(j)
  )
}