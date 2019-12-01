import React from 'react';

interface Props {
  name: string;
}

const MyContext = React.createContext('yellow submarine');

const Test: React.FC<Props> = () => {
  return (
    <div>
      <MyContext.Provider value="red submarine">
        <div>
          <p>Im a test</p>
          <Razred />
        </div>
      </MyContext.Provider>
    </div>
  );
};

export default Test;

class Razred extends React.Component {
  static contextType = MyContext;
  render() {
    return (
      <div>
        <h4>Razred indeed</h4>
        <div>{this.context}</div>
        <Raz />
      </div>
    );
  }
}

Razred.contextType = MyContext;

const Raz = () => {
  return (
    <div>
      <MyContext.Consumer>{myFunction}</MyContext.Consumer>
    </div>
  );
};

function myFunction(v: string) {
  return (
    <div>
      <h4>Raz</h4>
      <div>{v}</div>
    </div>
  );
}
