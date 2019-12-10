import './index.scss';

import React, { Component } from 'react';
import Category from './Category';
import CategoriesDropdown from './Dropdown';
import { classDecorator } from '../../../utils';

const cn = classDecorator('categories');

const ARROW_DOWN = 'ArrowDown';
const ARROW_UP = 'ArrowUp';
const ENTER = 'Enter';
const BACKSPACE = 'Backspace';

interface CategoriesBoxProps {}

interface CategoriesBoxState {
  value: string;
  isActive: boolean;
  categories: string[];
  selectedCategories: string[];
  activeDropdownItem: number | null;
}

export class CategoriesBox extends Component<CategoriesBoxProps, CategoriesBoxState> {
  private boxRef: React.RefObject<HTMLDivElement>;
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: CategoriesBoxProps) {
    super(props);

    this.state = {
      value: '',
      isActive: false,
      categories: ['work', 'fun', 'family'],
      selectedCategories: [],
      activeDropdownItem: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBoxBlur = this.handleBoxBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBoxFocus = this.handleBoxFocus.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);

    this.boxRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside(event: MouseEvent) {
    const { isActive } = this.state;
    if (!isActive) return;

    if (this.boxRef && !this.boxRef.current.contains(event.target as Node)) {
      this.setState({
        isActive: false,
        value: '',
      });
    }
  }

  handleBoxClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({ isActive: true }, () => this.inputRef.current.focus());
  };

  handleBoxFocus() {
    this.setState({ isActive: true }, () => this.inputRef.current.focus());
  }

  handleBoxBlur() {
    // @todo: find a solution - blur on TAB key press - a11y
    // this.setState({ isActive: false });
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const keyPressed = event.key;
    const { value, categories, selectedCategories, activeDropdownItem } = this.state;
    const valueTrimmed = value.trim();

    if (
      keyPressed !== ENTER &&
      keyPressed !== ARROW_DOWN &&
      keyPressed !== ARROW_UP &&
      keyPressed !== BACKSPACE
    ) {
      return;
    }

    if (keyPressed === BACKSPACE && selectedCategories.length) {
      // Remove the last category from the field
      const { selectedCategories } = this.state;
      this.removeCategory(selectedCategories[selectedCategories.length - 1]);
    } else if (keyPressed === ENTER) {
      const categoryName = valueTrimmed ? valueTrimmed : categories[activeDropdownItem];
      if (!categoryName) {
        return;
      }

      const existingCategory = categories.filter(catName => catName === categoryName)[0];
      const selectedCategory = selectedCategories.filter(catName => catName === categoryName)[0];

      if (!existingCategory) {
        this.createCategory(categoryName);
      }
      if (!selectedCategory) {
        this.addCategory(categoryName);
      }

      this.setState({
        value: '',
      });
    } else if (keyPressed === ARROW_DOWN || keyPressed === ARROW_UP) {
      // @todo: mouse hovering should change activeDropdownItem

      let activeItem;
      if (keyPressed === ARROW_UP) {
        if (activeDropdownItem === null || activeDropdownItem === 0) {
          activeItem = categories.length - 1;
        } else {
          activeItem = activeDropdownItem - 1;
        }
      } else if (keyPressed === ARROW_DOWN) {
        if (activeDropdownItem === null || activeDropdownItem === categories.length - 1) {
          activeItem = 0;
        } else {
          activeItem = activeDropdownItem + 1;
        }
      }

      this.setState({
        activeDropdownItem: activeItem,
      });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // @todo: filter categories when the user starts typing
    const { value } = event.target;
    this.setState({
      value,
    });
  }

  addCategory(name: string) {
    this.setState({
      selectedCategories: [...this.state.selectedCategories, name],
    });
  }

  createCategory(name: string) {
    // @todo: api call
    // @todo: @temporary: create in redux
  }

  removeCategory(name: string) {
    this.setState({
      selectedCategories: [...this.state.selectedCategories.filter(catName => catName !== name)],
    });
  }

  handleAddCategory(event: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) {
    const { categories, selectedCategories } = this.state;

    if (categories.indexOf(name) === -1) {
      this.createCategory(name);
    }

    if (selectedCategories.indexOf(name) === -1) {
      this.addCategory(name);
    }
  }

  handleCreateCategory(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const valueTrimmed = this.state.value.trim();
    this.createCategory(valueTrimmed);
    this.addCategory(valueTrimmed);
    this.setState({ value: '' });
  }

  handleRemoveCategory(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) {
    const { selectedCategories } = this.state;
    this.setState({
      selectedCategories: selectedCategories.filter(catName => catName !== name),
    });
  }

  render() {
    const { value, isActive, categories, selectedCategories, activeDropdownItem } = this.state;
    const valueTrimmed = value.trim();
    const inputCn = cn('input') + (isActive ? '' : ' nvm-hidden');
    const categoriesContainerCn = cn('container') + (isActive ? '' : ' nvm-hidden');

    return (
      <div
        tabIndex={0}
        className={cn()}
        ref={this.boxRef}
        onClick={this.handleBoxClick}
        onFocus={this.handleBoxFocus}
        onBlur={this.handleBoxBlur}
      >
        <div className={cn('wrap')}>
          <div className={categoriesContainerCn}>
            {!selectedCategories.length && !isActive && (
              <span className={cn('placeholder')}>Start typing to add categories...</span>
            )}
            {selectedCategories.map((catName: string) => (
              <Category
                key={catName}
                name={catName}
                shouldShowX={isActive}
                onRemove={e => this.handleRemoveCategory(e, catName)}
              />
            ))}
          </div>
          <input
            ref={this.inputRef}
            className={inputCn}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            value={value}
            type="text"
          />
        </div>
        {isActive && (
          <CategoriesDropdown
            value={valueTrimmed}
            onAdd={this.handleAddCategory}
            onCreate={this.handleCreateCategory}
            activeItem={activeDropdownItem}
            items={categories}
          />
        )}
      </div>
    );
  }
}

export default CategoriesBox;
