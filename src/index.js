import React from 'react';
import ReactDOM from 'react-dom';
import './Theme.scss'
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import store from './store'
import { ssoInit } from './providers/sso'

const application = (
    <Provider store={store}>
      <App />
    </Provider>
)

ReactDOM.render(application, document.getElementById('root'));

// Looks stupid but this ensures the Router/Switch in the App renders
// after logging in.
// For some reason react thinks no route is selected after a login to
// so only the navbar is rendered
ssoInit().finally(() => {
  ReactDOM.render(application, document.getElementById('root'));
})
