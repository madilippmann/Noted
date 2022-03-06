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

import * as sessionActions from "./store/session";


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
          {sessionUser ? <Notes /> : <Redirect to='/login' />}
        </Route>

        <Route exact path='/notebooks'>
          {sessionUser ? <div>NOTEBOOKS PAGE TODO</div> : <Redirect to='/login' />}
        </Route>

        <Route exact path='/tags'>
          {sessionUser ? <div>TAGS PAGE TODO</div> : <Redirect to='/login' />}
        </Route>

        <Route path={`/notes/:noteId`} >
          {sessionUser ? <Note /> : <Redirect to='/login' />}
        </Route>

        <Route >
          {sessionUser ? <div>Page Not Found</div> : <Redirect to='/login' />}
        </Route>

      </Switch>
      <InfoButton className='info' />
    </>
  );
}

export default App;
