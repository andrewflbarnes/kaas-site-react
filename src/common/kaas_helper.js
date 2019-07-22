import isEqual from 'react-fast-compare'

export function accumulateDivisions(scores) {
  return scores.reduce((acc, cur) => {
    const { division } = cur
    if (!acc.includes(division)) {
      acc.push(division)
    }
    return acc
  }, []);
}

/**
 * Takes a flat structure of scores and converts them to a nested one
 * 
 * @param {*} scores 
 */
export function accumulateLeagueDivisionClub(scores) {
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

    const index = acc.findIndex(e =>
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
      const {clubs} = acc[index]
      const clubIndex = clubs.findIndex(e =>
        e.name === club  
      )

      if (clubIndex < 0) {
        clubs.push(newClub)
      } else {
        const {divisions} = clubs[clubIndex]
        const divisionIndex = divisions.findIndex(e =>
          e.name === division  
        )

        if (divisionIndex < 0) {
          divisions.push(newDivision)
        } else {
          const {teams} = divisions[divisionIndex]
          const teamIndex = teams.findIndex(e =>
            e.name === team
          )
  
          if (teamIndex < 0) {
            teams.push(newTeam)
          } else {
            const { scores: teamScores } = teams[teamIndex]
            const { total } = teamScores
            teams[teamIndex].scores = {
              ...teamScores,
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

/**
 * Note that both props and state are processed the same - as a result if you only
 * want to check state changes you can use the first 3 arguments.
 * 
 * Similarly when checking both state and props it doesn't matter whether you
 * provide the state related args first or the prop related args first.
 * 
 * @param {*} props
 * @param {*} nextProps
 * @param {*} propNames
 * @param {*} state
 * @param {*} nextState
 * @param {*} stateNames
 */
export function havePropsOrStateChanged(props = {}, nextProps = {}, propNames = [], state = {}, nextState = {}, stateNames = []) {
  let shouldRender = false
  propNames.forEach(name => {
    shouldRender = shouldRender || !isEqual(props[name], nextProps[name])
  })

  if (!shouldRender) {
    stateNames.forEach(name => {
      shouldRender = shouldRender || !isEqual(state[name], nextState[name])
    })
  }

  return shouldRender
}


export function arePropsOrStateStillUndefined(props = {}, nextProps = {}, propNames = [], state = {}, nextState = {}, stateNames = []) {
  let wasDefined = true
  let isDefined = true
  propNames.forEach(name => {
    wasDefined = wasDefined && props[name]
    isDefined = isDefined && nextProps[name]
  })

  if (!wasDefined && !isDefined) {
    stateNames.forEach(name => {
      wasDefined = wasDefined && state[name]
      isDefined = isDefined && nextState[name]
    })
  }

  return !wasDefined && !isDefined
}