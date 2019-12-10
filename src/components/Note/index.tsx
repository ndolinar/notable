import './index.scss';

import React from 'react';
import TitleField from './TitleField';
import PrimaryButton from '../Buttons/PrimaryButton';
import Categories from './Categories';
import { classDecorator } from '../../utils';

const cn = classDecorator('note');

interface Props {}

interface LooseObject {
  [key: string]: any;
}

interface State {
  title: string;
  errors: LooseObject;
}

class Note extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: '',
      errors: {},
    };
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const errors = { ...this.state.errors };
    delete errors.title;

    this.setState({ title: event.target.value, errors });
  };

  handleSave = () => {
    const errors: LooseObject = {};
    const { title } = this.state;

    if (!title) {
      errors.title = 'Cannot be left empty.';
      this.setState({ errors });
      return;
    }
  };

  render() {
    const { title, errors } = this.state;

    return (
      <div className={cn()}>
        <div className={cn('section')}>
          <TitleField value={title} error={errors.title} onChange={this.handleTitleChange} />
        </div>
        <div className={cn('section')}>
          <Categories />
        </div>
        <div className={cn('controls')}>
          <PrimaryButton buttonType="secondary">Cancel</PrimaryButton>
          <PrimaryButton onClick={this.handleSave}>Save</PrimaryButton>
        </div>
      </div>
    );
  }
}

export default Note;
