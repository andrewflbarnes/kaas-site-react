import React from 'react';
import ReactDOM from 'react-dom';
import './Theme.scss'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './state/store'
import * as serviceWorker from './serviceWorker';

const application = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(application, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
