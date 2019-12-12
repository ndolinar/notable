import './index.scss';

import React from 'react';
import { connect } from 'react-redux';
import TitleField from './TitleField';
import PrimaryButton from '../Buttons/PrimaryButton';
import Categories from './Categories';
import { classDecorator, dateExtractor } from '../../utils';
import { CategoryType } from '../../store/categories/categoriesTypes';
import { noteActions } from '../../store/note/noteActions';
import { NoteType } from '../../store/note/noteTypes';
import { State } from '../../store/rootReducer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DateField } from './DateField';
import Moods, { Mood } from './Moods';
import { Button } from '../Buttons/Button';
import { dateSetter, dateValuesFormatter } from '../../utils/dateExtractor';

const cn = classDecorator('note-form');

interface NoteFormProps extends RouteComponentProps {
  id: number;
  incrementId: () => void;
  createNoteRequest: (note: NoteType) => void;
}

interface LooseObject {
  [key: string]: any;
}

export interface DateObject {
  day: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface NoteFormState {
  title: string;
  date: DateObject;
  errors: LooseObject;
  isDropdownActive: boolean;
  selectedCategories: CategoryType[];
  mood: Mood | null;
}

class NoteForm extends React.Component<NoteFormProps, NoteFormState> {
  constructor(props: NoteFormProps) {
    super(props);

    this.state = {
      title: '',
      errors: {},
      date: dateExtractor(new Date()),
      selectedCategories: [],
      isDropdownActive: false,
      mood: null,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.setDropdownActive = this.setDropdownActive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMood = this.handleMood.bind(this);
    this.handleBody = this.handleBody.bind(this);
  }

  handleBody() {}

  handleMood(mood: Mood) {
    this.setState({ mood });
  }

  handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const formattedValue = dateValuesFormatter(name, value);

    this.setState({
      date: { ...this.state.date, [name]: formattedValue },
    });
  }

  addCategory(name: string) {
    this.setState({
      selectedCategories: [...this.state.selectedCategories, name],
    });
  }

  removeCategory(name: string) {
    this.setState({
      selectedCategories: [...this.state.selectedCategories.filter(catName => catName !== name)],
    });
  }

  setDropdownActive(isActive: boolean) {
    this.setState({
      isDropdownActive: isActive,
    });
  }

  handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const errors = { ...this.state.errors };
    delete errors.title;
    this.setState({ title: event.target.value, errors });
  }

  handleSave() {
    const errors: LooseObject = {};
    const { id, history } = this.props;
    const { title, selectedCategories, date } = this.state;

    if (!title) {
      errors.title = 'Cannot be left empty.';
      this.setState({ errors });
      return;
    }

    const note: NoteType = {
      id,
      title,
      categories: selectedCategories,
      mood: 'neutral',
      date: dateSetter(date),
    };

    this.props.incrementId();
    this.props.createNoteRequest(note);
    history.push('/');
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (this.state.isDropdownActive) {
      return;
    }
    this.handleSave();
  }

  handleCancel() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { title, date, mood, errors, selectedCategories, isDropdownActive } = this.state;

    return (
      <form className={cn()} onSubmit={this.handleSubmit}>
        <div className={cn('section')}>
          <div className={cn('section-title')}>
            <i className="fa fa-pencil-alt"></i>
          </div>
          <div className={cn('section-content')}>
            <TitleField value={title} error={errors.title} onChange={this.handleTitleChange} />
          </div>
        </div>
        <div className={cn('section')}>
          <div className={cn('section-title')}>
            <i className="fa fa-tag"></i>
          </div>
          <div className={cn('section-content')}>
            <Categories
              isActive={isDropdownActive}
              setActive={this.setDropdownActive}
              selectedCategories={selectedCategories}
              addCategory={this.addCategory}
              removeCategory={this.removeCategory}
            />
          </div>
        </div>
        <div className={cn('section')}>
          <div className={cn('section-title')}>
            <i className="fa fa-cloud"></i>
          </div>
          <div className={cn('section-content')}>
            <Moods activeMood={mood} onClick={this.handleMood} />
          </div>
        </div>
        <div className={cn('section', 'nvm-shorter')}>
          <div className={cn('section-title')}>
            <i className="fa fa-calendar"></i>
          </div>
          <div className={cn('section-content')}>
            <DateField date={date} onChange={this.handleDateChange} />
          </div>
        </div>
        <div className={cn('section')}>
          <div className={cn('section-title')}>
            <i className="fa fa-clock"></i>
          </div>
          <div className={cn('section-content')}>
            <DateField isTime date={date} onChange={this.handleDateChange} />
          </div>
        </div>
        <div className={cn('section')}>
          <div className={cn('section-title')}>
            <i className="fa fa-pencil-alt"></i>
          </div>
          <div className={cn('section-content')}>
            <div className={cn('editable')} contentEditable></div>
          </div>
        </div>
        <div className={cn('controls')}>
          <PrimaryButton buttonType="secondary" onClick={this.handleCancel}>
            Cancel
          </PrimaryButton>
          <PrimaryButton mouseDown onClick={this.handleSave} onSubmit={this.handleSubmit}>
            Save
          </PrimaryButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: State) => ({
  id: state.note.id,
});

const mapDispatchToProps = {
  createNoteRequest: (note: NoteType) => noteActions.createNoteRequest(note),
  incrementId: () => noteActions.incrementId(),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteForm));
