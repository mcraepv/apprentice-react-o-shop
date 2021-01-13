import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './login/reducers';
import registerReducer from './register/reducers';
import productReducer from './product/reducers';
import newProductReducer from './newProduct/reducers';

const store = createStore(
  combineReducers(
    {
      login: loginReducer,
      register: registerReducer,
      products: productReducer,
      newProducts: newProductReducer,
    },
    composeWithDevTools()
  ),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
