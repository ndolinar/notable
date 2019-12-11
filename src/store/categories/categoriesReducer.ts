import { Reducer, AnyAction } from 'redux';
import { CategoriesState } from './categoriesTypes';
import { ADD_CATEGORY_REQUEST } from './categoriesActions';
import { State } from '../rootReducer';

const initialState: CategoriesState = {
  loading: false,
  error: null,
  status: '',
  categories: [],
};

const categoriesReducer: Reducer<CategoriesState> = (
  state: CategoriesState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST: {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export const getCategoriesState = (state: State) => state.categories;
export const getCategories = (state: State) => state.categories.categories;

export default categoriesReducer;
