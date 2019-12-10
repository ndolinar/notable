import './Dropdown.scss';

import React from 'react';
import DropdownItem from './DropdownItem';
import { classDecorator } from '../../../utils';
const cn = classDecorator('categories-dropdown');

// CreateItem component: is the last item in the Dropdown
interface CreateItemProps {
  value: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CreateItem: React.FC<CreateItemProps> = ({ value, onClick }) => {
  return (
    <div className={cn('create')} onClick={onClick}>
      <div className={cn('create-text')}>Create</div>
      <div className={cn('create-name')}> {value}</div>
    </div>
  );
};

// Dropdown component
interface DropdownProps {
  items: string[];
  activeItem: number | null;

  value: string;
  onAdd: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => void;
  onCreate: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, value, onAdd, onCreate, activeItem }) => {
  return (
    <div className={cn()}>
      <div className={cn('help-text')}>Select an option or create one</div>
      {items.map((catName: string, ix: number) => (
        <DropdownItem
          key={catName}
          isActive={activeItem === ix}
          onClick={e => onAdd(e, catName)}
          name={catName}
        />
      ))}
      {value && items.indexOf(value) === -1 && <CreateItem onClick={onCreate} value={value} />}
    </div>
  );
};

export default Dropdown;
