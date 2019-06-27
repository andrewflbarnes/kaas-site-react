import { combineReducers } from 'redux'
import errors from './errors'
import loading from './loading'

const status = combineReducers({
  errors,
  loading
});

export default status;
