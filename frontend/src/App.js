import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import InfoButton from "./components/InfoButton";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Home from "./components/Home";
import Notes from './components/Notes';
import Navigation from "./components/Navigation";
import Note from "./components/Note";
import Notebook from './components/Notebook';
import Settings from './components/Settings'
import PageNotFound from "./components/PageNotFound";

import * as sessionActions from "./store/session";
import Notebooks from "./components/Notebooks";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);


  return isLoaded && (
    <>
      {sessionUser && <Navigation />}
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>

        <Route path='/signup'>
          <SignupFormPage />
        </Route>

        <Route exact path='/'>
          {sessionUser ? <Home /> : <Redirect to='/login' />}
        </Route>

        <Route exact path='/notes'>
          {sessionUser ? <Notes userId={sessionUser.id} /> : <Redirect to='/login' />}
        </Route>

        <Route exact path='/notebooks'>
          {sessionUser ? <Notebooks /> : <Redirect to='/login' />}
        </Route>

        {/*
        <Route exact path='/settings'>
          {sessionUser ? <Settings /> : <Redirect to='/login' />}
        </Route> */}

        <Route path='/notebooks/:notebookId'>
          {sessionUser ? <Notebook userId={sessionUser.id} /> : <Redirect to='/login' />}
        </Route>

        <Route path={`/notes/:noteId`} >
          {sessionUser ? <Note userId={sessionUser.id} /> : <Redirect to='/login' />}
        </Route>

        <Route >
          {sessionUser ? <PageNotFound /> : <Redirect to='/login' />}
        </Route>

      </Switch>
      {sessionUser ? <InfoButton color='dark' /> : <InfoButton color='light' />}

    </>
  );
}

export default App;
