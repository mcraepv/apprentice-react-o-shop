import React from 'react';

import { Route, Redirect } from 'react-router';
import routePaths from '../../constants/routePaths';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: routePaths.login, state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
