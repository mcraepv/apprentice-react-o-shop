import React from 'react';
import Form from '../../components/Form/Form';

const Login = () => {
  const inputs = ['username', 'password'];

  //the console log is a placeholder for a submit handler that will likely make API queries
  return (
    <Form
      formType="Login"
      handleSubmit={() => console.log('submit')}
      inputsArr={inputs}
    />
  );
};

export default Login;
