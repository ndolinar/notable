import './Note.scss';

import React from 'react';
import { connect } from 'react-redux';
import { classDecorator } from '../../utils';
import { NoteType } from '../../store/note/noteTypes';
import { State } from '../../store/rootReducer';

const cn = classDecorator('notes-note');

interface NoteProps {
  note: NoteType;
  onClick: (note: NoteType) => void;
}

class Note extends React.Component<NoteProps, {}> {
  constructor(props: NoteProps) {
    super(props);
  }

  render() {
    const { note, onClick } = this.props;
    const { title, date } = note;
    const dateString = date.toLocaleString();
    return (
      <div key={note.id} className={cn()} onClick={() => onClick(note)}>
        <div className={cn('date')}>{dateString}</div>
        {title}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
