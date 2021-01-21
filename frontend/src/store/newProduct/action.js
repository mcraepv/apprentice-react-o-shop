import actionTypes from './actionTypes';
import newProductService from '../../services/newProductService';

const getProducts = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_REQUEST });

    newProductService.getProducts().then(
      (newProducts) => {
        dispatch({ type: actionTypes.GET_SUCCESS, newProducts });
      },
      (error) => {
        console.log(error);
        dispatch({ type: actionTypes.GET_FAILURE, error });
      }
    );
  };
};

export default {
  getProducts,
};
