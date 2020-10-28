import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import channels from "./channels_reducer";
import uiReducer from "./ui_reducer"
import users from "./users_reducer";
import events from "./events_reducer";
import todos from "./todo_reducer";

const RootReducer = combineReducers({
  errors,
  session,
  channels,
  users,
  events,
  todos,
  ui: uiReducer
});

export default RootReducer;