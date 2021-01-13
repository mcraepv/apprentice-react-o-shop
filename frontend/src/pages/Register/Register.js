import React from 'react';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';
import { registerActions } from '../../store/register/action';

const Register = () => {
  const inputs = ['firstName', 'lastName', 'username', 'password'];

  const dispatch = useDispatch();

  return (
    <Form
      formType="Register"
      handleSubmit={(inputs) => {
        dispatch(registerActions.register(inputs));
      }}
      inputsArray={inputs}
    />
  );
};

export default Register;
