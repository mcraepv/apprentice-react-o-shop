import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../utils/history';
import routePaths from '../../constants/routePaths';
import Table from '../../components/Table/Table';
import productActions from '../../store/product/action';

const AdminProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);

  const columns = [
    { header: 'ID', name: 'id' },
    { header: 'Name', name: 'title' },
    { header: 'Price', name: 'price' },
  ];

  if (!products) {
    return <p>Getting product data...</p>;
  }

  return (
    <div className="row">
      <div className="col">
        <Table
          data={products}
          columns={columns}
          isEditable
          editURL={routePaths.adminProducts + routePaths.newProduct}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            history.push(routePaths.adminProducts + routePaths.newProduct);
          }}
        >
          New Product
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;
