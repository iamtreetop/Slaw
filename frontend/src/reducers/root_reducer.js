import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import channels from "./channels_reducer";

const RootReducer = combineReducers({
  errors,
  session,
  channels
});

export default RootReducer;