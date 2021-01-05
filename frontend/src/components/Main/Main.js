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
  NewProduct,
} from '../../pages/pages';
import routePaths from '../../constants/routePaths';

const Main = () => {
  return (
    <main className="mt-5 pt-3 container">
      <Switch>
        <Route exact path={routePaths.home} component={Products} />
        <Route exact path={routePaths.adminOrders} component={AdminOrders} />
        <Route
          exact
          path={routePaths.adminProducts}
          component={AdminProducts}
        />
        <Route exact path={routePaths.checkout} component={CheckOut} />
        <Route exact path={routePaths.orders} component={Orders} />
        <Route exact path={routePaths.orderSuccess} component={OrderSuccess} />
        <Route exact path={routePaths.shoppingCart} component={ShoppingCart} />
        <Route
          exact
          path={routePaths.adminProducts + routePaths.newProduct}
          component={NewProduct}
        />
      </Switch>
    </main>
  );
};

export default Main;
