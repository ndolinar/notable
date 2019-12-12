import React from 'react';
import NoteForm from '../components/NoteForm';
import { classDecorator } from '../utils';

const cn = classDecorator('page');

export const CreatePage = () => {
  return (
    <div className={cn('', 'is-create')}>
      <div className={cn('main')}>
        <NoteForm />
      </div>
    </div>
  );
};

export default CreatePage;
