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
import EventShowContainer from './events/event_show_container';
import EventEditContainer from './events/event_edit_container';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import UsePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  CombocboxOption,
} from '@reach/combobox';
// import "../@reach/comboboc/styles.css"
// import "../@reach/comboboc/styles.css"
import "../../../node_modules/@reach/combobox/styles.css"

import Modal from "../components/modal/modal"

import "./app_main.css"

const App = () => (
  <div className="app-main">
      <NavBarContainer />
      <Modal />
      <ProtectedRoute exact path="/channels" component={SideBarContainer} />
      {/* <ProtectedRoute exact path="/channels/:channelId" component={SideBarContainer} /> */}
      <ProtectedRoute exact path="/channels/:channelId/:eventId" component={SideBarContainer} />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/channels" component={ChannelIndexContainer} />
      {/* <ProtectedRoute exact path="/channels/:channelId" component={ChannelShowContainer} /> */}
      <ProtectedRoute exact path="/channels/:channelId/:eventId" component={EventShowContainer} />
      <ProtectedRoute exact path="/events/:channelId/new" component={EventFormContainer} />
      <ProtectedRoute exact path="/events/:channelId/:eventId/edit" component={EventEditContainer} />
      <Redirect to="/"></Redirect>
    </Switch>
      {/* <ProtectedRoute exact path="/channels/:channelId/:eventId" component={ChannelShowContainer} /> */}
  </div>
);

export default App;