import './Note.scss';

import React from 'react';
import { connect } from 'react-redux';
import { classDecorator } from '../../utils';
import { NoteType } from '../../store/note/noteTypes';
import { State } from '../../store/rootReducer';
import extractDateComponents, { dateFormatter } from '../../utils/dateExtractor';

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

    const dateString = dateFormatter(date);
    return (
      <div key={note.id} className={cn()} onClick={() => onClick(note)}>
        <div className={cn('wrap')}>
          <div className={cn('body')}>
            <div className={cn('title')}>{title}</div>
            <div className={cn('content')}>
              <div className={cn('date')}>{dateString}</div>
            </div>
          </div>
          <div className={cn('actions')}>
            <button>
              <i className="fa fa-ellipsis-v"></i>
            </button>
            <button>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Note);

const DateWidget = (date: any) => {
  return (
    <div>
      <div>{date.day}</div>
      <div>{date.month}</div>
    </div>
  );
};
