import { combineReducers } from 'redux'
import filters from './FilterOptions/reducers'
import kaas from './common/reducers'

const reducers = combineReducers({
  filters,
  kaas
});

export default reducers;
