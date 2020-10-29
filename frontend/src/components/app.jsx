import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import SideBarContainer from "./sidebar/sidebar_container"
import ChannelShowContainer from './channels/channel_show_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ChannelIndexContainer from './channels/channel_index_container';
import EventFormContainer from './events/event_form_container';


import Modal from "../components/modal/modal"

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    <ProtectedRoute exact path="/channels" component={SideBarContainer} />
    <ProtectedRoute exact path="/channels/:channelId" component={SideBarContainer} />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/channels" component={ChannelIndexContainer} />
      <ProtectedRoute exact path="/channels/:channelId" component={ChannelShowContainer} />
      <ProtectedRoute exact path="/events/new" component={EventFormContainer} />
      <Redirect to="/"></Redirect>
    </Switch>
  </div>
);

export default App;