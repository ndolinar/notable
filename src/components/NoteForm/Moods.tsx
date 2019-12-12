import './Moods.scss';

import React from 'react';
import { classDecorator } from '../../utils';

const cn = classDecorator('moods');

const moods = [
  { id: 1, name: 'Happiest', icon: 'fa-grin-beam' },
  { id: 2, name: 'Happier', icon: 'fa-smile-beam' },
  { id: 3, name: 'Happy', icon: 'fa-smile' },
  { id: 4, name: 'Meh', icon: 'fa-meh' },
  { id: 5, name: 'Flushed', icon: 'fa-flushed' },
  { id: 6, name: 'Angry', icon: 'fa-angry' },
  { id: 7, name: 'Frown', icon: 'fa-frown' },
];

interface MoodsProps {
  onClick: (icon: string) => void;
}

export const Moods = (props: MoodsProps) => {
  const onClick = props.onClick;

  return (
    <div className={cn()}>
      {moods.map(mood => (
        <div key={mood.id} className={cn('item')}>
          <button className={cn('button')} type="button" onClick={() => onClick(mood.icon)}>
            <i className={cn('button-icon', `fa ${mood.icon}`)}></i>
          </button>
          <div className={cn('title')}>{mood.id}</div>
        </div>
      ))}
    </div>
  );
};

export default Moods;
