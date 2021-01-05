import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routePaths from '../../constants/routePaths';

const Form = (props) => {
  const { formType, handleSubmit, inputsArr } = props;

  const inputsMap = {};

  const oppositeType = formType === 'Register' ? 'Login' : 'Register';

  //mapping inputsArr prop to object for use in UseState hook
  inputsArr.forEach((input) => {
    inputsMap[input] = '';
  });

  const [inputs, setInputs] = useState(inputsMap);

  //this exists to keep any value change separate from the inputsMap and the state hook
  const inputsDestructure = { ...inputs };

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    //checking for empty fields
    for (const prop in inputs) {
      if (!inputs[prop]) {
        return;
      }
    }

    handleSubmit(inputs);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const formFields = [];

  for (let i = 0; i < inputsArr.length; i++) {
    formFields.push(
      <div className="form-group" key={inputsArr[i]}>
        <input
          type={inputsArr[i] === 'password' ? 'password' : 'text'}
          name={inputsArr[i]}
          placeholder={inputsArr[i]}
          value={inputsDestructure[inputsArr[i]]}
          onChange={onChange}
          className={
            'form-control' +
            (submitted && !inputsDestructure[inputsArr[i]] ? ' is-invalid' : '')
          }
        />
        {submitted && !inputsDestructure[inputsArr[i]] && (
          <div className="invalid-feedback">{inputsArr[i]} is required</div>
        )}
      </div>
    );
  }

  return (
    <div className="col-lg-4 offset-lg-4">
      <h2>{formType}</h2>
      <form name="form" onSubmit={onSubmit}>
        {formFields}
        <div className="form-group">
          <button className="btn bt-primary">{formType}</button>
          <Link
            to={routePaths[oppositeType.toLowerCase()]}
            className="btn btn-link"
          >
            {oppositeType}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
