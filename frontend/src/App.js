import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
      <h1>Hello from App</h1>

      <Switch>
        <Route exact path="/">
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
