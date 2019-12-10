import { combineReducers, Reducer } from 'redux';
import { NoteState } from './note/noteTypes';
import { CategoriesState } from './categories/categoriesTypes';
import noteReducer from './note/noteReducer';
import categoriesReducer from './categories/categoriesReducer';

export interface State {
  note: NoteState;
  categories: CategoriesState;
}

const rootReducer: Reducer<State> = combineReducers({
  note: noteReducer,
  categories: categoriesReducer,
});

export default rootReducer;
