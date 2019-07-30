import React from 'react';
import ReactDOM from 'react-dom';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import './Theme.scss'
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import store from './store'

const keycloak = new Keycloak()

const application = (
  <Provider store={store}>
    <KeycloakProvider keycloak={keycloak}>
      <App />
    </KeycloakProvider>
  </Provider>
)

ReactDOM.render(application, document.getElementById('root'));
