import React from 'react';
import Note from '../components/Note';
import { classDecorator } from '../utils';

const cn = classDecorator('page');

export const CreatePage = () => {
  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <Note />
      </div>
    </div>
  );
};

export default CreatePage;
