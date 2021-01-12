import actions from './actionTypes';

let users = JSON.parse(localStorage.getItem('users'));
const initialState = users ? { users } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.REGISTER_REQUEST:
      return {
        registering: true,
        user: action.user,
      };
    case actions.REGISTER_SUCCESS:
      return {
        registered: true,
        user: action.user,
      };
    case actions.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};
