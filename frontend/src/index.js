import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/bootstrap.min.css';
import history from './utils/history';
import store from './store/store';
import { configureFakeBackend } from './utils/FakeBackend';

configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
