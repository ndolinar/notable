import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store/rootReducer';
import { NoteType } from '../../store/note/noteTypes';
import { getNotes } from '../../store/note/noteReducer';
import Note from './Note';
import { classDecorator } from '../../utils';

const cn = classDecorator('notes');

export interface NotesProps {
  notes: NoteType[];
}

interface NotesState {}

class Notes extends React.Component<NotesProps, NotesState> {
  handleNoteClick = (note: NoteType) => {
    console.log('note clicked. title: ', note.title);
  };
  render() {
    const { notes } = this.props;
    return (
      <div className={cn()}>
        {notes.map(note => (
          <Note key={note.id} onClick={this.handleNoteClick} note={note} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  notes: getNotes(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
