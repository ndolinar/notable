import { NoteType } from './noteTypes';
import { createAction } from '../utils';

export const CREATE_NOTE_REQUEST = 'CREATE_NOTE_REQUEST';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAILURE = 'CREATE_NOTE_FAILURE';

export const DELETE_NOTE_REQUEST = 'DELETE_NOTE_REQUEST';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE';

export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const LOAD_NOTE = 'LOAD_NOTE';
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

export const INCREMENT_ID = 'INCREMENT_ID';

export const noteActions = {
  incrementId: () => createAction(INCREMENT_ID),
  addNote: (payload: NoteType) => createAction(ADD_NOTE, payload),
  createNoteRequest: (payload: NoteType) => createAction(CREATE_NOTE_REQUEST, payload),
  createNoteSuccess: (message: string) => createAction(CREATE_NOTE_SUCCESS, message),
  createNoteFailure: (error: string) => createAction(CREATE_NOTE_FAILURE, error),
};
