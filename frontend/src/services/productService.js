import handleResponse from './handleResponse';

const addProduct = (product) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  };

  return fetch('http://localhost:4000/products/add', requestOptions).then(
    handleResponse
  );
};

const getProducts = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch('http://localhost:4000/products/get', requestOptions).then(
    handleResponse
  );
};

export default {
  addProduct,
  getProducts,
};
