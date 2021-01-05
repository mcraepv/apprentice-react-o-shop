import React from 'react';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';
import { registerActions } from '../../store/register/action';

const Register = () => {
  const inputs = ['firstname', 'lastname', 'username', 'password'];

  const dispatch = useDispatch();

  return (
    <Form
      formType="Register"
      handleSubmit={(inputs) => {
        dispatch(registerActions.register(inputs));
      }}
      inputsArr={inputs}
    />
  );
};

export default Register;
