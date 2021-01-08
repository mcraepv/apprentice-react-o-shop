import React from 'react';
import Form from '../../components/Form/Form';

const Register = () => {
  const inputs = ['firstname', 'lastname', 'username', 'password'];

  //the console log exists as a placeholder for a later submit handler
  return (
    <Form
      formType="Register"
      handleSubmit={() => console.log('submit')}
      inputsArr={inputs}
    />
  );
};

export default Register;
