/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LandingPage from './LandingPage';
import HomePage from './HomePage';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { Logo } from '../styles';

const App = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
