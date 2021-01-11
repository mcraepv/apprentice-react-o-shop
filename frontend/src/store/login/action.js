import actionTypes from './actionTypes';
import { userService } from '../../services/userService';
import history from '../../utils/history';

const login = (username, password) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST, user: { username } });

    userService.login(username, password).then(
      (user) => {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, user });
        history.push('/');
      },
      (err) => {
        console.log(err);
        dispatch({ type: actionTypes.LOGIN_FAILURE, err });
      }
    );
  };
};

const logout = () => {
  userService.logout();
  return { type: actionTypes.LOGOUT };
};

export const loginActions = {
  login,
  logout,
};
