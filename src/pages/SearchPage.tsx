import React from 'react';
import { classDecorator } from '../utils';
const cn = classDecorator('page');

export const SearchPage = () => {
  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <h1>Search</h1>
      </div>
    </div>
  );
};

export default SearchPage;
