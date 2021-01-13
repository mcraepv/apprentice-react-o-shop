//simulating a pre-registered user for testing
import newProducts from '../constants/dummyProducts';

localStorage.setItem('new-products', JSON.stringify(newProducts));

localStorage.setItem(
  'users',
  JSON.stringify([
    {
      firstName: 'Ahmed',
      lastName: 'Aly',
      username: 'ahmed.aly',
      password: 'umbrage',
      id: 1,
    },
  ])
);

localStorage.setItem(
  'products',
  JSON.stringify([
    {
      title: 'Apple',
      price: '1.00',
      category: 'fruits',
      imageURL:
        'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80',
      id: 1,
    },
    {
      title: 'Celery',
      price: '2.00',
      category: 'vegetables',
      imageURL:
        'https://images.unsplash.com/photo-1601459427108-47e20d579a35?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80',
      id: 2,
    },
    {
      title: 'Mango',
      price: '4.00',
      category: 'fruits',
      imageURL:
        'https://images.unsplash.com/photo-1587486936739-78df7470c7e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1401&q=80',
      id: 3,
    },
  ])
);

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

export const configureFakeBackend = () => {
  let realFetch = window.fetch;
  window.fetch = (url, opts) => {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts.body);

    return new Promise((resolve, reject) => {
      const handleRoute = () => {
        switch (true) {
          case url.endsWith('/new-products/get') && method === 'GET':
            return getNewProducts();
          case url.endsWith('/products/get') && method === 'GET':
            return getProducts();
          case url.endsWith('/products/add') && method === 'POST':
            return addProduct();
          case url.endsWith('/users/authenticate') && method === 'POST':
            return authenticate();
          case url.endsWith('/users/register') && method === 'POST':
            return register();
          case url.endsWith('/users') && method === 'GET':
            return getUsers();
          case url.match(/\/users\/\d+$/) && method === 'DELETE':
            return deleteUser();
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      };
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);
      // route functions

      const getNewProducts = () => {
        const newProducts = JSON.parse(localStorage.getItem('new-products'));

        return ok(newProducts);
      };

      const getProducts = () => {
        const products = JSON.parse(localStorage.getItem('products'));

        return ok(products);
      };

      const addProduct = () => {
        const product = body;

        product.id = products.length
          ? Math.max(...products.map((x) => x.id)) + 1
          : 1;
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        return ok();
      };

      const authenticate = () => {
        const { username, password } = body;
        const user = users.find((userStored) => {
          return (
            userStored.username === username && userStored.password === password
          );
        });
        if (!user) return error('Username or password is incorrect');
        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token',
        });
      };

      const register = () => {
        const user = body;

        if (users.find((userStored) => userStored.username === user.username)) {
          return error(`Username  ${user.username} is already taken`);
        }

        // assign user id and a few other properties then save
        user.id = users.length
          ? Math.max(...users.map((userStored) => userStored.id)) + 1
          : 1;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return ok();
      };

      const getUsers = () => {
        if (!isLoggedIn()) return unauthorized();

        return ok(users);
      };

      const deleteUser = () => {
        if (!isLoggedIn()) return unauthorized();

        users = users.filter((userStored) => userStored.id !== idFromUrl());
        localStorage.setItem('users', JSON.stringify(users));
        return ok();
      };

      // helper functions

      const ok = (body) => {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      };

      const unauthorized = () => {
        resolve({
          status: 401,
          text: () =>
            Promise.resolve(JSON.stringify({ message: 'Unauthorized' })),
        });
      };

      const error = (message) => {
        resolve({
          status: 400,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      };

      const isLoggedIn = () => {
        return headers['Authorization'] === 'Bearer fake-jwt-token';
      };

      const idFromUrl = () => {
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
      };
    });
  };
};
