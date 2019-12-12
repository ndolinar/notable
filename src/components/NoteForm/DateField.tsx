import './DateField.scss';

import React from 'react';
import { classDecorator } from '../../utils';
import { DateObject } from './';

const cn = classDecorator('note-date');

interface DateFieldProps {
  date: DateObject;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isTime?: boolean;
}

export const DateField = (props: DateFieldProps) => {
  const { date, isTime, onChange } = props;
  if (!isTime) {
    return (
      <div className={cn('')}>
        <div className={cn('item')}>
          <input
            className={cn('input')}
            name="day"
            type="text"
            value={date.day}
            onChange={onChange}
          />
          <div className={cn('item-title')}>Day</div>
        </div>
        <div className={cn('item')}>
          <input
            className={cn('input')}
            name="month"
            type="text"
            value={date.month}
            onChange={onChange}
          />
          <div className={cn('item-title')}>Month</div>
        </div>
        <div className={cn('item')}>
          <input
            className={cn('input', 'nvm-wide')}
            name="year"
            type="text"
            value={date.year}
            onChange={onChange}
          />
          <div className={cn('item-title')}>Year</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={cn('')}>
        <div className={cn('item')}>
          <input
            className={cn('input')}
            name="hours"
            type="text"
            value={date.hours}
            onChange={onChange}
          />
          <div className={cn('item-title')}>Hours</div>
        </div>
        <div className={cn('item')}>
          <input
            className={cn('input')}
            name="minutes"
            type="text"
            value={date.minutes}
            onChange={onChange}
          />
          <div className={cn('item-title')}>Minutes</div>
        </div>
      </div>
    );
  }
};
