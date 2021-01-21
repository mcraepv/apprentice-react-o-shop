import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import newProductActions from '../../store/newProduct/action';
import departments from '../../constants/departments';
import ProductSortOne from '../../components/ProductSortOne/ProductSortOne';
import ProductSortTwo from '../../components/ProductSortTwo/ProductSortTwo';

const Products = () => {
  const dispatch = useDispatch();
  const [isSortMethodOne, setIsSortMethodOne] = useState(true);
  const [productOptions, setProductOptions] = useState({
    brands: [],
    deliveryOptions: [],
    departments: {},
  });

  const productsRetrieval = useSelector(
    ({ newProducts: { newProducts } }) => newProducts
  );

  useEffect(() => {
    dispatch(newProductActions.getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!productsRetrieval || productOptions.brands.length) return;
    let brands = [];
    let deliveryOptions = [];

    productsRetrieval.forEach(({ brand, deliveryOption }) => {
      brands.push(brand);
      deliveryOptions.push(deliveryOption);
    });

    //making array elements unique
    brands = [...new Set(brands)];
    deliveryOptions = [...new Set(deliveryOptions)];

    setProductOptions(() => ({
      brands,
      deliveryOptions,
      departments,
    }));
  }, [productsRetrieval]);

  const sortButtonClickHandler = () => {
    setIsSortMethodOne(!isSortMethodOne);
  };

  if (!productsRetrieval) return <p>Loading Products...</p>;

  return (
    <div>
      {isSortMethodOne ? (
        <ProductSortOne
          productOptions={productOptions}
          products={productsRetrieval}
          sortButtonClickHandler={sortButtonClickHandler}
        />
      ) : (
        <ProductSortTwo
          products={productsRetrieval}
          sortButtonClickHandler={sortButtonClickHandler}
        />
      )}
    </div>
  );
};

export default Products;
