import './PrimaryButton.scss';

import React from 'react';
import { classDecorator } from '../../utils';
const cn = classDecorator('primary-button');

type ButtonType = 'primary' | 'secondary';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string;
  isSubmit?: boolean;
  buttonType?: ButtonType;
}

export const PrimaryButton: React.FC<Props> = ({ buttonType, onClick, children, isSubmit }) => {
  const classNames = cn('', buttonType || '');

  return (
    <button className={classNames} onClick={onClick} type={isSubmit ? 'submit' : 'button'}>
      {children}
    </button>
  );
};

export default PrimaryButton;
