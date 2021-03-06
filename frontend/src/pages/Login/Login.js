import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';
import { loginActions } from '../../store/login/action';

const Login = () => {
  const inputs = ['username', 'password'];

  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      dispatch(loginActions.logout());
    }
  }, [dispatch]);

  return (
    <Form
      formType="Login"
      handleSubmit={(inputs) =>
        dispatch(loginActions.login(inputs.username, inputs.password))
      }
      inputsArray={inputs}
    />
  );
};

export default Login;
