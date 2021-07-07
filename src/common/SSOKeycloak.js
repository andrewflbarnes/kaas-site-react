function parseTokens(keycloak) {
  const { tokenParsed } = keycloak
  return {
    username: tokenParsed.preferred_username,
  }
}

export default class SSOKeycloak {
  constructor(keycloak) {
    this.keycloak = keycloak
  }

  async init(options) {
    const { keycloak } = this
    let authenticated = false
    try {
      authenticated = await keycloak.init({ ...options, promiseType: 'native' })
    } catch (error) {
      return {
        result: false,
        authenticated,
        error
      }
    }

    if (!authenticated) {
      return {
        result: true,
        authenticated
      }
    }

    localStorage.setItem('kc_token', keycloak.token);
    localStorage.setItem('kc_refreshToken', keycloak.refreshToken);

    return {
      result: true,
      authenticated,
      tokens: parseTokens(keycloak)
    }
  }
}