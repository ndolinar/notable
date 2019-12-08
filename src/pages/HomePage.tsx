import React from 'react';
import { classDecorator } from '../utils';

const cn = classDecorator('page');

export const HomePage = () => {
  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default HomePage;
