import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/index'

import AutosaveProvider from './context/AutosaveContext';
import * as sessionActions from './store/session';
import * as notesActions from "./store/notes";
import * as notebooksActions from "./store/notebooks";
import * as tagsActions from "./store/tags";
import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.notesActions = notesActions;
  window.notebooksActions = notebooksActions;
  window.tagsActions = tagsActions;

}


function Root() {
  return (
    <Provider store={store}>
      <AutosaveProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AutosaveProvider>
    </Provider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
