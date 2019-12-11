import './PrimaryButton.scss';

import React from 'react';
import { classDecorator } from '../../utils';
const cn = classDecorator('primary-button');

type ButtonType = 'primary' | 'secondary';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string;
  isSubmit?: boolean;
  buttonType?: ButtonType;
  mousedownInteraction?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  buttonType,
  onClick,
  children,
  isSubmit,
  mousedownInteraction,
}) => {
  const stopEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick(e);
  };

  const classNames = cn('', buttonType || '');

  return (
    <button
      {...{
        className: classNames,
        type: isSubmit ? 'submit' : 'button',
        ...(mousedownInteraction ? { onMouseDown: onClick } : { onClick }),
      }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
