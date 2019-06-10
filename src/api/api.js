
let endpoints = {
  organisation: '/organisation',
  competition: '/competition',
  season: '/season',
  league: '/league',
  regional: '/regional',
  regionalScores: '/score/regional',
}

const api = {
  async getOrganisations() {
    const response = await fetch(endpoints.organisation, {
      method: 'GET',
    });

    return response.json();
  },

  async getCompetitions() {
    const response = await fetch(endpoints.competition, {
      method: 'GET',
    });

    return response.json();
  },

  async getSeasons() {
    const response = await fetch(endpoints.season, {
      method: 'GET',
    });

    return response.json();
  },
  
  async getLeagues() {
    const response = await fetch(endpoints.league, {
      method: 'GET',
    });

    return response.json();
  },
  
  async getRegionals() {
    const response = await fetch(endpoints.regional, {
      method: 'GET',
    });

    return response.json();
  },
  
  async getRegionalScores() {
    const response = await fetch(endpoints.regionalScores, {
      method: 'GET',
    });

    return response.json();
  },
};

export default api;