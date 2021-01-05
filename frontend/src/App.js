import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Login, Register, Home } from './pages/pages';
import routePaths from './constants/routePaths';
import PrivateRoute from './components/Shared/PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path={routePaths.login} component={Login} />
        <Route path={routePaths.register} component={Register} />
        <PrivateRoute path={routePaths.home} component={Home} />
      </Switch>
    </div>
  );
};

export default App;
