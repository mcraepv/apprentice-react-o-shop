import actions from './actionTypes';

let newProducts = JSON.parse(localStorage.getItem('newProducts'));
const initialState = newProducts ? { newProducts } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_REQUEST:
      return {
        getting: true,
      };
    case actions.GET_SUCCESS:
      return {
        gotten: true,
        newProducts: action.newProducts,
      };
    case actions.GET_FAILURE:
      return {};
    default:
      return state;
  }
};
