import actions from './actionTypes';

let products = JSON.parse(localStorage.getItem('products'));
const initialState = products ? { products } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_REQUEST:
      return {
        adding: true,
        product: action.product,
      };
    case actions.ADD_SUCCESS:
      return {
        added: true,
        product: action.product,
      };
    case actions.ADD_FAILURE:
      return {};
    default:
      return state;
  }
};
