import { combineReducers } from 'redux'
import filters from './filters/reducers'
import status from './status/reducers'
import kaas from './kaas/reducers'

const reducers = combineReducers({
  filters,
  status,
  kaas
});

export default reducers;
