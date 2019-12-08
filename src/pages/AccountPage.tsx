import React from 'react';
import { NavLink, Link, Route } from 'react-router-dom';
import { classDecorator } from '../utils';

const cn = classDecorator('page');

export const AccountPage = () => {
  return (
    <div className={cn()}>
      <div className={cn('navigation')}>
        <div className={cn('navigation-item')}>
          <NavLink className={cn('navigation-link')} exact to="/account">
            Account
          </NavLink>
        </div>
        <div className={cn('navigation-item')}>
          <NavLink
            className={cn('navigation-link')}
            exact
            to="/account/settings"
          >
            Settings
          </NavLink>
        </div>
      </div>
      <div className={cn('main')}>
        <Route exact path="/account">
          <h1>Manage your account</h1>
          <Link to="/logout">Log out</Link>
        </Route>
        <Route path="/account/settings">
          <h1>Settings</h1>
        </Route>
      </div>
    </div>
  );
};

export default AccountPage;
