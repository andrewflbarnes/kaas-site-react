
const endpoints = {
  organisation: '/organisation',
  competition: '/competition',
  season: '/season',
  division: '/division',
  league: '/league',
  regional: '/regional',
  regionalScores: '/score/regional',
}

async function GET(endpoint) {
  return fetch(endpoint, {
    method: 'GET',
  }).then(response =>
    response.json()
  ).catch(error => {
    throw(error)
  })
}

const api = {
  async getOrganisations() {
    return GET(endpoints.organisation)
  },

  async getCompetitions() {
    return GET(endpoints.competition)
  },

  async getSeasons() {
    return GET(endpoints.season)
  },
  
  async getDivisions() {
    return GET(endpoints.division)
  },
  
  async getLeagues() {
    return GET(endpoints.league)
  },
  
  async getRegionals() {
    return GET(endpoints.regional)
  },
  
  async getRegionalScores() {
    return GET(endpoints.regionalScores)
  },
};

export default api;