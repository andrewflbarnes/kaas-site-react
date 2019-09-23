
function defaultLoginSuccess(resolve, keycloak) {
  localStorage.setItem('kc_token', keycloak.token);
  localStorage.setItem('kc_refreshToken', keycloak.refreshToken);

  resolve({
    authenticated: true,
    username: keycloak.tokenParsed.preferred_username
  })
}

function keycloakInit(keycloak) {

  const token = localStorage.getItem('kc_token');
  const refreshToken = localStorage.getItem('kc_refreshToken');

  // TODO - see if we can push this into a context or hooks or whatver
  // But it needs to work better than react-keycloak
  return new Promise((resolve, reject) => {
    if (!keycloak) {
      resolve({ authenticated: false })
    }

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

function loadKeycloakScript() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  // TODO
  script.src = "http://localhost:8901/auth/js/keycloak.js"; 
  document.getElementsByTagName("head")[0].appendChild(script);
  if (window.Keycloak) {
    const keycloak = window.Keycloak()
    window.keycloak = keycloak
    keycloakInit(keycloak)
  }
}

function getKeycloak() {
  if (!window.keycloak) {
    loadKeycloakScript()
  }
  return window.keycloak
}

export function ssoInit() {
  const keycloak = getKeycloak()
  return keycloakInit(keycloak)
}

export function ssoLogin() {
  const keycloak = getKeycloak()

  return new Promise((resolve, reject) => {
    if (!keycloak) {
      resolve({ authenticated: false })
    }

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