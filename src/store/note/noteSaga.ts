import { fork, take, takeEvery, put } from 'redux-saga/effects';
import { CREATE_NOTE_REQUEST, noteActions } from './noteActions';
import { AnyAction } from 'redux';

// @todo: call api
function* createNote(action: AnyAction) {
  const { payload } = action;
  yield put(noteActions.addNote(payload));
}

export default function* noteSaga() {
  yield takeEvery(CREATE_NOTE_REQUEST, createNote);
}
