import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import {
  HomePage,
  AccountPage,
  CreatePage,
  SearchPage,
  CalendarPage,
  NotFoundPage,
} from './pages';

const App = () => (
  <Router>
    <div className="app">
      <Navigation />
      <div className="page">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/create" component={CreatePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/calendar" component={CalendarPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
