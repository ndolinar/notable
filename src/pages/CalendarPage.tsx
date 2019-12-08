import React from 'react';
import { classDecorator } from '../utils';
const cn = classDecorator('page');

export const CalendarPage = () => {
  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <h1>Calendar</h1>
      </div>
    </div>
  );
};

export default CalendarPage;
