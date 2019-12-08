import './index.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { classDecorator } from '../../utils';
const cn = classDecorator('navigation');

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
          <div className={cn('menu-item')}>
            <NavLink className={cn('link')} to="/create">
              <div className={cn('link-title')}>Create</div>
              <i className={cn('link-icon', 'fa fa-pencil')}></i>
            </NavLink>
          </div>
          <div className={cn('menu-item')}>
            <NavLink className={cn('link')} to="/search">
              <div className={cn('link-title')}>Search</div>
              <i className={cn('link-icon', 'fa fa-search')}></i>
            </NavLink>
          </div>
          <div className={cn('menu-item')}>
            <NavLink className={cn('link')} to="/calendar">
              <div className={cn('link-title')}>Calendar</div>
              <i className={cn('link-icon', 'fa fa-calendar')}></i>
            </NavLink>
          </div>
          <div className={cn('menu-item')}>
            <NavLink className={cn('link')} to="/account">
              <div className={cn('link-title')}>User</div>
              <i className={cn('link-icon', 'fa fa-user')}></i>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
