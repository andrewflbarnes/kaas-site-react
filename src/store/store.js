import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import reducers from './state/reducers';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

export default store;
