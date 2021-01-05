import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Form from '../../components/Form/Form';
import ProductCard from '../../components/ProductCard/ProductCard';
import productActions from '../../store/product/action';

const NewProduct = () => {
  const [formInputs, setFormInputs] = useState({
    title: '',
    price: '',
    category: '',
    imageURL: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getProducts());
  }, [dispatch]);

  const params = useParams();

  const products = useSelector(({ products: { products } }) => products);

  const product =
    params.id && products
      ? products.find((match) => match.id === parseInt(params.id))
      : null;

  useEffect(() => {
    if (!product) return;
    setFormInputs(() => ({
      ...product,
    }));
  }, [product]);

  const inputs = ['title', 'price', 'category', 'imageURL'];

  const categories = [
    { name: 'Bread', id: 'bread' },
    { name: 'Vegetables', id: 'vegetables' },
    { name: 'Fruits', id: 'fruits' },
    { name: 'Dairy', id: 'dairy' },
  ];

  return (
    <div className="row">
      <div className="col-8">
        <Form
          formType="New Product"
          handleSubmit={(inputs) => {
            dispatch(productActions.addProduct(inputs));
          }}
          inputsArray={inputs}
          categoriesArray={categories}
          onChangeParentUpdate={(name, value) => {
            setFormInputs((formInputs) => ({
              ...formInputs,
              [name]: value,
            }));
          }}
          existingValues={product}
        />
      </div>
      <div className="col-4">
        <ProductCard
          title={formInputs.title}
          price={formInputs.price}
          imageURL={formInputs.imageURL}
        />
      </div>
    </div>
  );
};

export default NewProduct;
