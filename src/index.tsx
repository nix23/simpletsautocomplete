import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const root = document.getElementById('approot');
ReactDOM.render(<App/>, root);

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    ReactDOM.render(<App/>, root);
  });
}