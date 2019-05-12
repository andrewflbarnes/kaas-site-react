import { combineReducers } from 'redux'
import filters from './FilterOptions/reducers'
import regionalScores from './RegionalScores/reducers'

const reducers = combineReducers({
  filters,
  regionalScores
});

export default reducers;
