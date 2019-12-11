import './PrimaryButton.scss';

import React from 'react';
import { classDecorator } from '../../utils';
const cn = classDecorator('primary-button');

type ButtonType = 'primary' | 'secondary';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  children: string;

  buttonType?: ButtonType;
  mousedownInteraction?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  buttonType,
  onClick,
  children,
  onSubmit,
  mousedownInteraction,
}) => {
  const classNames = cn('', buttonType || '');

  return (
    <button
      {...{
        className: classNames,
        type: onSubmit ? 'submit' : 'button',
        ...(mousedownInteraction ? { onMouseDown: onClick } : { onClick }),
        ...(onSubmit ? { onSubmit } : {}),
      }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
