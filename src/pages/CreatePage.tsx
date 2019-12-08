import React from 'react';
import { classDecorator } from '../utils';
const cn = classDecorator('page');

export const CreatePage = () => {
  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <h1>Create</h1>
      </div>
    </div>
  );
};

export default CreatePage;
