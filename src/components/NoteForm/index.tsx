import './index.scss';

import React from 'react';
import { connect } from 'react-redux';
import TitleField from './TitleField';
import PrimaryButton from '../Buttons/PrimaryButton';
import Categories from './Categories';
import { classDecorator } from '../../utils';
import { CategoryType } from '../../store/categories/categoriesTypes';
import { noteActions } from '../../store/note/noteActions';
import { NoteType } from '../../store/note/noteTypes';
import { State } from '../../store/rootReducer';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const cn = classDecorator('note-form');

interface NoteFormProps extends RouteComponentProps {
  id: number;
  incrementId: () => void;
  createNoteRequest: (note: NoteType) => void;
}

interface LooseObject {
  [key: string]: any;
}

interface NoteFormState {
  title: string;
  errors: LooseObject;
  isDropdownActive: boolean;
  selectedCategories: CategoryType[];
}

class NoteForm extends React.Component<NoteFormProps, NoteFormState> {
  constructor(props: NoteFormProps) {
    super(props);

    this.state = {
      title: '',
      isDropdownActive: false,
      errors: {},
      selectedCategories: [],
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.setDropdownActive = this.setDropdownActive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { title, errors, selectedCategories, isDropdownActive } = this.state;

    return (
      <form className={cn()} onSubmit={this.handleSubmit}>
        <div className={cn('section')}>
          <TitleField value={title} error={errors.title} onChange={this.handleTitleChange} />
        </div>
        <div className={cn('section')}>
          <Categories
            isActive={isDropdownActive}
            setActive={this.setDropdownActive}
            selectedCategories={selectedCategories}
            addCategory={this.addCategory}
            removeCategory={this.removeCategory}
          />
        </div>
        <div className={cn('controls')}>
          <PrimaryButton onClick={this.handleCancel}>Cancel</PrimaryButton>
          <PrimaryButton onMouseDown={this.handleSave} onSubmit={this.handleSubmit}>
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
