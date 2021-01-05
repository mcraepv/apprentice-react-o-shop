import React from 'react';
import history from '../../utils/history';
import routePaths from '../../constants/routePaths';

const AdminProducts = () => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        history.push(routePaths.adminProducts + routePaths.newProduct);
      }}
    >
      New Product
    </button>
  );
};

export default AdminProducts;
