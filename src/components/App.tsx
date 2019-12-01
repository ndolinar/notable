import React, { Suspense } from 'react';
const Test = React.lazy(() => import('./Test'));

const App = () => (
  <div>
    <h1>Hello, World!</h1>
    <Suspense fallback={<div>Loading!</div>}>
      <Test name="Ya" />
    </Suspense>
  </div>
);

export default App;
