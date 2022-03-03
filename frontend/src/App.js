import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Switch>
      {/* <Route exact path='/'>
          <div>HOME PAGE</div>
        </Route> */}
      <Route exact path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>

  );
}

export default App;
