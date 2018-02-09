import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app';
import reducer from './reducers';
import "./stylesheets/style_black.scss";
import "./stylesheets/style_white.scss";

let store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
