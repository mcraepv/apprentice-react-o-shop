import React from 'react';
import './Main.module.scss';
import { Route, Switch } from 'react-router-dom';
import {
  Home,
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
        <Route exact path={routePaths.home} component={Home}></Route>
        <Route path={routePaths.products} component={Products}></Route>
        <Route path={routePaths.adminOrders} component={AdminOrders}></Route>
        <Route
          path={routePaths.adminProducts}
          component={AdminProducts}
        ></Route>
        <Route path={routePaths.checkout} component={CheckOut}></Route>
        <Route path={routePaths.orders} component={Orders}></Route>
        <Route path={routePaths.orderSuccess} component={OrderSuccess}></Route>
        <Route path={routePaths.shoppingCart} component={ShoppingCart}></Route>
      </Switch>
    </main>
  );
};

export default Main;
