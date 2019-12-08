import './index.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { classDecorator } from '../../utils';
const cn = classDecorator('navigation');

const routes = [
  { path: '/create', name: 'CreaRRte', icon: 'pencil' },
  { path: '/search', name: 'Search', icon: 'search' },
  { path: '/calendar', name: 'Calendar', icon: 'calendar' },
  { path: '/account', name: 'User', icon: 'user' },
];

export const Navigation = () => {
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('menu', 'is-left')}>
          <div className={cn('menu-item', 'is-logo')}>
            <NavLink className={cn('link', 'is-logo')} to="/">
              notable
            </NavLink>
          </div>
        </div>
        <div className={cn('menu', 'is-right')}>
          {routes.map(route => (
            <div key={route.name} className={cn('menu-item')}>
              <NavLink className={cn('link')} to={route.path}>
                <div className={cn('link-title')}>{route.name}</div>
                <i className={cn('link-icon', `fa fa-${route.icon}`)}></i>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
