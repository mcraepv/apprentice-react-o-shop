import handleResponse from './handleResponse';

const getProducts = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch('http://localhost:4000/new-products/get', requestOptions).then(
    handleResponse
  );
};

export default {
  getProducts,
};
