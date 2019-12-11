import { CategoryType } from './categoriesTypes';
import { createAction } from '../utils';

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export const categoriesActions = {
  addCategoryRequest: (payload: CategoryType) => createAction(ADD_CATEGORY_REQUEST, payload),
  addCategorySuccess: (message: CategoryType) => createAction(ADD_CATEGORY_SUCCESS, message),
  addCategoryFailure: (error: CategoryType) => createAction(ADD_CATEGORY_FAILURE, error),
};
