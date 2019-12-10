import { Reducer, AnyAction } from 'redux';
import { NoteState } from './noteTypes';
import { State } from '../rootReducer';
import { ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS } from './noteActions';
const initialState: NoteState = {
  loading: false,
  error: null,
  status: '',
  note: {
    title: '',
    categories: [],
    mood: '',
    date: '',
    createdAt: '',
    modifiedAt: '',
  },
};

const noteReducer: Reducer<NoteState> = (state: NoteState = initialState, action: AnyAction) => {
  switch (action.type) {
    // @todo: api
    case ADD_NOTE_REQUEST: {
      return state;
    }
    case ADD_NOTE_SUCCESS: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export const getNoteState = (state: State) => state.note;
export const getNote = (state: State) => state.note.note;

export default noteReducer;
