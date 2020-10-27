import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import channels from "./channels_reducer";
import uiReducer from "./ui_reducer"

const RootReducer = combineReducers({
  errors,
  session,
  channels,
  ui: uiReducer
});

export default RootReducer;