import handleResponse from './handleResponse';

const login = (username, password) => {
  const body = {
    username: username,
    password: password,
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch('/users/authenticate', requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const register = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch('/users/register', requestOptions).then(handleResponse);
};

export const userService = {
  login,
  logout,
  register,
};
