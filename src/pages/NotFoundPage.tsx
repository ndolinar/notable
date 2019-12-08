import React from 'react';
import { classDecorator } from '../utils';

const cn = classDecorator('page');

export const NotFoundPage = () => {
  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <h1>Four Oh No</h1>
        <p>Page not found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
