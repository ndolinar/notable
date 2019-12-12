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
import Moods from './Moods';
import { Button } from '../Buttons/Button';

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
  mood: string | null;
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

  handleMood(mood: string) {
    this.setState({ mood });
  }

  handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    let numVal = value && parseInt(value.replace(/\D/gm, ''));

    if (name === 'day') {
      numVal = numVal === 0 ? 1 : numVal > 31 ? 31 : numVal;
    } else if (name === 'month') {
      numVal = numVal === 0 ? 1 : numVal > 12 ? 12 : numVal;
    } else if (name === 'year') {
      numVal = numVal > 50000 ? 2019 : numVal;
    } else if (name === 'hours') {
      numVal = numVal > 24 ? 24 : numVal;
    } else if (name === 'minutes') {
      numVal = numVal > 59 ? 59 : numVal;
    }

    const val = numVal.toString();

    this.setState({
      date: { ...this.state.date, [name]: val },
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
    const { title, selectedCategories } = this.state;

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
      date: new Date(),
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
    const { title, date, errors, selectedCategories, isDropdownActive } = this.state;

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
            <Moods onClick={this.handleMood} />
          </div>
        </div>
        <div className={cn('section')}>
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
