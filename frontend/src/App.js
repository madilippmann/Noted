import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import InfoButton from "./components/InfoButton";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

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
          <Home />
        </Route>
        <Route path='/notebooks'>
          {/* <Notebooks /> */}
        </Route>
        <Route path='/notes'>
          {/* <Notes /> */}
        </Route>
        <Route path='/tags'>
          {/* <Tags /> */}
        </Route>
        <Route path='/shared'>
          {/* <Shared /> */}
        </Route>
        <Route >
          Page Not Found
        </Route>
      </Switch>
      <InfoButton className='info' />
    </>
  );
}

export default App;
