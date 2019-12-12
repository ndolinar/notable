import { ADD_NOTE, REMOVE_NOTE, INCREMENT_ID } from './noteActions';
import { NoteState } from '../note/noteTypes';
import { AnyAction } from 'redux';
import { State } from '../rootReducer';

const initialState: NoteState = {
  id: 0,
  loading: false,
  error: null,
  status: '',
  notes: [
    { id: 1, title: 'Sample note', categories: ['work', 'fun'], mood: 'neutral', date: new Date() },
  ],
};

const noteReducer = (state: NoteState = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_NOTE: {
      const newArr = [...state.notes, action.payload];
      console.log('new notes: ', newArr);
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    }
    case INCREMENT_ID: {
      return {
        ...state,
        id: state.id + 1,
      };
    }
    case REMOVE_NOTE: {
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id),
      };
    }
    default: {
      return state;
    }
  }
};

export const getNotes = (state: State) => state.note.notes;

export default noteReducer;
