import React from 'react';
import ReactDOM from 'react-dom';
import './Theme.scss'
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import store from './store'

const keycloak = window.Keycloak();
window.keycloak = keycloak

const token = localStorage.getItem('kc_token');
const refreshToken = localStorage.getItem('kc_refreshToken');

const application = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<h6>initialising...</h6>, document.getElementById('root'));

// TODO - see if we can push this into a context or hooks or whatver
// But it needs to work better than react-keycloak
keycloak.init({ promiseType: 'native', token, refreshToken }).then(authenticated => {
  if (authenticated) {
    localStorage.setItem('kc_token', keycloak.token);
    localStorage.setItem('kc_refreshToken', keycloak.refreshToken);
  }
}).catch(err => {
  console.err(err)
}).finally(() =>{
  ReactDOM.render(application, document.getElementById('root'));
})
