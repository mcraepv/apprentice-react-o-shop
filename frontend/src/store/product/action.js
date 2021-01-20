import actionTypes from './actionTypes';
import productService from '../../services/productService';
import history from '../../utils/history';
import routePaths from '../../constants/routePaths';

const addProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_REQUEST, product: product });

    productService.addProduct(product).then(
      (product) => {
        dispatch({ type: actionTypes.ADD_SUCCESS, product });
        history.push(routePaths.adminProducts);
      },
      (error) => {
        console.log(error);
        dispatch({ type: actionTypes.ADD_FAILURE, error });
      }
    );
  };
};

export default {
  addProduct,
};
