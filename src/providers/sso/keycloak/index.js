function getKeycloak() {
  return window.keycloak
}

function defaultLoginSuccess(resolve, keycloak) {
  localStorage.setItem('kc_token', keycloak.token);
  localStorage.setItem('kc_refreshToken', keycloak.refreshToken);

  resolve({
    authenticated: true,
    username: keycloak.tokenParsed.preferred_username
  })
}

export function ssoInit() {
  const keycloak = getKeycloak()

  const token = localStorage.getItem('kc_token');
  const refreshToken = localStorage.getItem('kc_refreshToken');

  // TODO - see if we can push this into a context or hooks or whatver
  // But it needs to work better than react-keycloak
  return new Promise((resolve, reject) => {
    keycloak.init({ promiseType: 'native', token, refreshToken }).then(authenticated => {
      if (authenticated) {
        defaultLoginSuccess(resolve, keycloak)
      } else {
        resolve({ authenticated })
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export function ssoLogin() {
  const keycloak = getKeycloak()

  return new Promise((resolve, reject) => {
    keycloak.login()
    .then(() => {
      defaultLoginSuccess(resolve, keycloak)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export function ssoUserInfo() {
  const keycloak = getKeycloak()
  return keycloak.loadUserProfile()
}

export function ssoLogout() {
  const keycloak = getKeycloak()

  localStorage.removeItem('kc_token')
  localStorage.removeItem('kc_refreshToken')

  keycloak.logout()
}

const ssoKeycloak = {
  ssoInit,
  ssoLogin
}

export default ssoKeycloak