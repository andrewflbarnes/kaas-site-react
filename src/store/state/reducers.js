import { combineReducers } from 'redux'
import filters from './filters/reducers'
import status from './status/reducers'
import kaas from './kaas/reducers'
import auth from './auth/reducers'

const reducers = combineReducers({
  filters,
  status,
  kaas,
  auth
});

export default reducers;
