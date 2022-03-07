import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/index'
import * as sessionActions from './store/session';
import * as notesActions from "./store/notes";
import * as notebooksActions from "./store/notebooks";

import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.notesActions = notesActions;
  window.notebooksActions = notebooksActions;

}


function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
