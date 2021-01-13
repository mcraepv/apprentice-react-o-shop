import React from 'react';

const ProductOptionCheck = ({ value, clickHandler }) => (
  <div className="col">
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={value}
        onClick={clickHandler}
      />
      <label className="form-check-label">{value}</label>
    </div>
  </div>
);

export default ProductOptionCheck;
