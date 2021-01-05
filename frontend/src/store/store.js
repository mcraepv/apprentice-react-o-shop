import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './login/reducers';
import registerReducer from './register/reducers';
import productReducer from './product/reducers';

const store = createStore(
  combineReducers(
    {
      login: loginReducer,
      register: registerReducer,
      products: productReducer,
    },
    composeWithDevTools()
  ),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
