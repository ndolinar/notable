import { combineReducers, Reducer } from 'redux';
import { NoteState } from './note/noteTypes';
import noteReducer from './note/noteReducer';

export interface State {
  note: NoteState;
}

const rootReducer: Reducer<State> = combineReducers({
  note: noteReducer,
});

export default rootReducer;
