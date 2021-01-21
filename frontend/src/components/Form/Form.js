import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import routePaths from '../../constants/routePaths';

const Form = ({
  formType,
  handleSubmit,
  inputsArray,
  categoriesArray,
  onChangeParentUpdate,
  existingValues,
}) => {
  const inputsMap = {};

  const oppositeType =
    formType === 'Register' ? 'Login' : formType === 'Login' ? 'Register' : '';

  const buttonText =
    formType === 'New Product' ? 'Create New Product' : formType;

  //mapping inputsArray prop to object for use in UseState hook
  inputsArray.forEach((input) => {
    inputsMap[input] = {
      value: '',
      isValid: false,
      hasChanged: false,
    };
  });

  const [inputs, setInputs] = useState(inputsMap);

  //this exists to keep any value change separate from the inputsMap and the state hook
  //until we are ready to update
  const inputsDestructure = { ...inputs };

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const inputsResponse = {};
    let isValidSubmit = true;

    Object.entries(inputs).forEach(([key, { isValid, value }]) => {
      if (!isValid) {
        isValidSubmit = false;
        return;
      }
      inputsResponse[key] = value;
    });

    if (!isValidSubmit) return;

    handleSubmit(inputsResponse);
  };

  const onChange = ({ target: { name, value } }) => {
    let isValid;

    if ((name === 'price' && isNaN(value)) || !value) {
      isValid = false;
    } else isValid = true;

    setInputs((inputs) => ({
      ...inputs,
      [name]: {
        value,
        isValid,
        hasChanged: true,
      },
    }));

    if (onChangeParentUpdate) {
      onChangeParentUpdate(name, value);
    }
  };

  const formFields = inputsArray.map((input, index) => {
    const inputField = (
      <input
        type={input === 'password' ? 'password' : 'text'}
        name={input}
        placeholder={input === 'price' ? '0.00' : input}
        value={
          !inputs[input].hasChanged && existingValues
            ? existingValues[input]
            : inputsDestructure[input].value
        }
        onChange={onChange}
        className={
          'form-control' +
          (submitted && !inputsDestructure[input].isValid ? ' is-invalid' : '')
        }
      />
    );

    const priceModifier = (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">$</span>
        </div>
        {inputField}
      </div>
    );

    const categoryList = categoriesArray
      ? categoriesArray.map((category, index) => {
          return (
            <option value={category.id} key={index}>
              {category.name}
            </option>
          );
        })
      : null;

    const categoryModifier = (
      <div
        className={
          'input-group mb-3' +
          (submitted && !inputsDestructure[input].isValid ? ' is-invalid' : '')
        }
      >
        <select
          className="custom-select"
          onChange={onChange}
          name={input}
          value={existingValues ? existingValues[input].toLowerCase() : ''}
        >
          <option defaultValue>{input}</option>
          {categoryList}
        </select>
      </div>
    );

    return (
      <div className="form-group" key={index}>
        {input === 'price'
          ? priceModifier
          : input === 'category'
          ? categoryModifier
          : inputField}
        {submitted && !inputsDestructure[input].isValid && (
          <div className="text-danger">Valid {input} is required.</div>
        )}
      </div>
    );
  });

  return (
    <div>
      <h2>{formType}</h2>
      <form name="form" onSubmit={onSubmit}>
        {formFields}
        <div className="form-group">
          <button className="btn btn-secondary">{buttonText}</button>
          {oppositeType.length ? (
            <Link
              to={routePaths[oppositeType.toLowerCase()]}
              className="btn btn-link"
            >
              {oppositeType}
            </Link>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Form;
