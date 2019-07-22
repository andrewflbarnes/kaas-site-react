import React from 'react';
import ReactDOM from 'react-dom';
import './Theme.scss'
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import store from './state/store'

const application = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(application, document.getElementById('root'));
