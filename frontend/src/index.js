// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../node_modules/normalize.css'
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import WebFont from 'webfontloader';
// import { createTodo, deleteTodo } from './actions/todo_actions'


document.addEventListener('DOMContentLoaded', () => {
  // WebFont.load({
  //   google: {
  //     families: ['Titillium Web:300,400,700', 'sans-serif']
  //   }
  // });
  let store;
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById('root');
  // window.createTodo = createTodo;
  // window.deleteTodo = deleteTodo;
  // window.dispatch = store.dispatch
  ReactDOM.render(<Root store={store} />, root);
});