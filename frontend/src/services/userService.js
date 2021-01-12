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

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        window.location.reload(true);
      }

      const err = (data && data.message) || response.statusText;
      return Promise.reject(err);
    }

    return data;
  });
};

export const userService = {
  login,
  logout,
  register,
};
