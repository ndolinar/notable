import { Note } from './noteTypes';
import { createAction } from '../utils';

export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE';

export const LOAD_NOTE = 'LOAD_NOTE';
export const LOAD_NOTE_REQUEST = 'LOAD_NOTE_REQUEST';
export const LOAD_NOTE_SUCCESS = 'LOAD_NOTE_SUCCESS';
export const LOAD_NOTE_FAILURE = 'LOAD_NOTE_FAILURE';

export const noteActions = {
  loadNote: (payload: Note) => createAction(LOAD_NOTE, payload),
  addNoteRequest: (payload: Note) => createAction(ADD_NOTE_REQUEST, payload),
  addNoteSuccess: (message: string) => createAction(ADD_NOTE_SUCCESS, message),
  addNoteFailure: (error: string) => createAction(ADD_NOTE_FAILURE, error),
};
