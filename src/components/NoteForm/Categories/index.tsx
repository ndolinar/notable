import './index.scss';

import React, { Component, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import CategoriesDropdown from './Dropdown';
import { State } from '../../../store/rootReducer';
import { CategoryType } from '../../../store/categories/categoriesTypes';
import { getCategories } from '../../../store/categories/categoriesReducer';
import { categoriesActions } from '../../../store/categories/categoriesActions';
import { classDecorator } from '../../../utils';

const cn = classDecorator('categories');

const ARROW_DOWN = 'ArrowDown';
const ARROW_UP = 'ArrowUp';
const ENTER = 'Enter';
const BACKSPACE = 'Backspace';
const TAB = 'Tab';

interface CategoriesProps {
  isActive: boolean;
  categories: CategoryType[];
  selectedCategories: CategoryType[];
  setActive: (arg: boolean) => void;
  addCategory: (name: CategoryType) => void;
  removeCategory: (name: CategoryType) => void;
  createCategory: (category: CategoryType) => void;
}

interface CategoriesState {
  value: string;
  activeDropdownItem: number | null;
}

export class Categories extends Component<CategoriesProps, CategoriesState> {
  private boxRef: React.RefObject<HTMLDivElement>;
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: CategoriesProps) {
    super(props);

    this.state = {
      value: '',
      activeDropdownItem: null,
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);

    this.boxRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentDidUpdate(prevProps: CategoriesProps) {
    if (prevProps.isActive !== this.props.isActive) {
      if (this.props.isActive) {
        console.log('setting to input focus');
        this.returnFocusToInput();
      } else {
        this.inputRef.current.blur();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside(event: MouseEvent) {
    const { isActive } = this.props;
    if (!isActive) return;

    if (this.boxRef && !this.boxRef.current.contains(event.target as Node)) {
      this.props.setActive(false);
      this.setState({
        value: '',
      });
    }
  }

  handleBoxClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    this.props.setActive(true);
  };

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const keyPressed = event.key;
    if (keyPressed === TAB) {
      this.props.setActive(false);
      return;
    }
    const { categories } = this.props;
    const { value, activeDropdownItem } = this.state;
    const { selectedCategories } = this.props;
    const valueTrimmed = value.trim();

    if (
      keyPressed !== ENTER &&
      keyPressed !== ARROW_DOWN &&
      keyPressed !== ARROW_UP &&
      keyPressed !== BACKSPACE
    ) {
      return;
    }

    if (keyPressed === BACKSPACE && !valueTrimmed && selectedCategories.length) {
      // Remove the last category from the field
      this.props.removeCategory(selectedCategories[selectedCategories.length - 1]);
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
        this.props.addCategory(categoryName);
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

  createCategory(name: string) {
    // @todo: api call
    // @todo: @temporary: create in redux
    this.props.createCategory(name);
  }

  handleAddCategory(event: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) {
    const { categories, selectedCategories } = this.props;
    console.log('add cat');
    if (categories.indexOf(name) === -1) {
      this.createCategory(name);
    }

    if (selectedCategories.indexOf(name) === -1) {
      this.props.addCategory(name);
    }

    this.returnFocusToInput();
  }

  returnFocusToInput = () => {
    this.inputRef.current.focus();
  };

  handleCreateCategory(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const valueTrimmed = this.state.value.trim();
    this.createCategory(valueTrimmed);
    this.props.addCategory(valueTrimmed);
    this.setState({ value: '' });
    this.returnFocusToInput();
  }

  hf = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!this.props.isActive) {
      this.props.setActive(true);
    }
    console.log('on focus');
  };
  hb = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('on blur');
    console.log('event.target: ', event.target);
    this.props.setActive(false);
  };

  handleRemoveCategory = (catName: string) => {
    this.props.removeCategory(catName);
    this.returnFocusToInput();
  };

  render() {
    const { categories, isActive, selectedCategories } = this.props;
    const { value, activeDropdownItem } = this.state;
    const valueTrimmed = value.trim();
    const inputCn = cn('input');
    const categoriesContainerCn = cn('container') + (isActive ? '' : ' nvm-hidden');

    return (
      <div className={cn()} ref={this.boxRef} onClick={this.handleBoxClick}>
        <div className={cn('wrap', isActive ? 'nvm-active' : '')}>
          <div className={categoriesContainerCn}>
            {!selectedCategories.length && !isActive && (
              <span className={cn('placeholder')}>Select categories</span>
            )}
            {selectedCategories.map((catName: string) => (
              <Category
                key={catName}
                name={catName}
                shouldShowX={isActive}
                onRemove={() => this.handleRemoveCategory(catName)}
              />
            ))}
            <input
              ref={this.inputRef}
              className={inputCn}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              value={value}
              onFocus={this.hf}
              // onBlur={this.hb}
              type="text"
            />
          </div>
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

const mapStateToProps = (state: State) => ({
  categories: getCategories(state),
});

const mapDispatchToProps = {
  createCategory: (category: CategoryType) => categoriesActions.addCategoryRequest(category),
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
