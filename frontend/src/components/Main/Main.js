import React from 'react';

import './Main.module.scss';
import { Route, Switch } from 'react-router-dom';
import {
  Products,
  AdminOrders,
  AdminProducts,
  CheckOut,
  Orders,
  OrderSuccess,
  ShoppingCart,
} from '../../pages/pages';
import routePaths from '../../constants/routePaths';

const Main = () => {
  return (
    <main className="mt-5 pt-3">
      <Switch>
        <Route exact path={routePaths.home} component={Products}></Route>
        <Route
          exact
          path={routePaths.adminOrders}
          component={AdminOrders}
        ></Route>
        <Route
          exact
          path={routePaths.adminProducts}
          component={AdminProducts}
        ></Route>
        <Route exact path={routePaths.checkout} component={CheckOut}></Route>
        <Route exact path={routePaths.orders} component={Orders}></Route>
        <Route
          exact
          path={routePaths.orderSuccess}
          component={OrderSuccess}
        ></Route>
        <Route
          exact
          path={routePaths.shoppingCart}
          component={ShoppingCart}
        ></Route>
      </Switch>
    </main>
  );
};

export default Main;
