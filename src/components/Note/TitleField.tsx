import './TitleField.scss';

import React from 'react';
import { classDecorator } from '../../utils';
const cn = classDecorator('note-title');

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export const Title: React.FC<Props> = ({ value, onChange, error }) => {
  return (
    <div className={cn()}>
      <input
        autoFocus
        type="text"
        className={cn('input')}
        value={value}
        name="title"
        placeholder="Untitled"
        onChange={onChange}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Title;
