
let endpoints = {
  regionalScores: '/score/regional',
}

const api = {
  async getRegionalScores() {
    const response = await fetch(endpoints.regionalScores, {
      method: 'GET',
    });

    return response.json();
  },
};

export default api;