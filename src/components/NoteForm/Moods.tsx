import './Moods.scss';

import React from 'react';
import { classDecorator } from '../../utils';

const cn = classDecorator('moods');

export interface Mood {
  id: number;
  name: string;
  icon: string;
}

const moods = [
  { id: 1, name: 'Happiest', icon: 'fa-grin-beam' },
  { id: 2, name: 'Happier', icon: 'fa-smile-beam' },
  { id: 3, name: 'Happy', icon: 'fa-smile' },
  { id: 4, name: 'Meh', icon: 'fa-meh' },
  { id: 6, name: 'Angry', icon: 'fa-angry' },
  { id: 7, name: 'Frown', icon: 'fa-frown' },
];

interface MoodsProps {
  onClick: (mood: Mood) => void;
  activeMood: Mood;
}

export const Moods = (props: MoodsProps) => {
  const { onClick, activeMood } = props;

  return (
    <div className={cn()}>
      {moods.map(mood => (
        <div key={mood.id} className={cn('item')}>
          <button
            className={cn('button', activeMood && activeMood.id === mood.id ? 'nvm-active' : '')}
            type="button"
            onClick={() => onClick(mood)}
          >
            <i className={cn('button-icon', `fa ${mood.icon}`)}></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Moods;
