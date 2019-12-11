import './Category.scss';

import React from 'react';

interface CategoryProps {
  name: string;
  onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  shouldShowX: boolean;
}

const Category: React.FC<CategoryProps> = ({ name, onRemove, shouldShowX }) => {
  const categoryCn = `category ${shouldShowX ? 'nvm-has-x' : ''}`;
  return (
    <div className={categoryCn}>
      <div className="category-name">{name}</div>
      <button className="category-remove-button" type="button" onClick={onRemove}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

export default Category;
