import actionTypes from './actionTypes';
import { userService } from '../../services/userService';
import history from '../../utils/history';
import routePaths from '../../constants/routePaths';

const register = (newUser) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST, user: newUser });

    userService.register(newUser).then(
      (user) => {
        dispatch({ type: actionTypes.REGISTER_SUCCESS, user });
        history.push(routePaths.login);
      },
      (error) => {
        console.log(error);
        dispatch({ type: actionTypes.REGISTER_FAILURE, error });
      }
    );
  };
};

export const registerActions = {
  register,
};
