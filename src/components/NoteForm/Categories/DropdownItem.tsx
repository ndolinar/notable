import './DropdownItem.scss';

import React from 'react';
import { classDecorator } from '../../../utils';
const cn = classDecorator('categories-dropdown-item');

interface DropdownItemProps {
  name: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ name, isActive, onClick }) => {
  return (
    <div onClick={onClick} className={cn('', isActive ? 'nvm-active' : '')}>
      {name}
    </div>
  );
};

export default DropdownItem;
