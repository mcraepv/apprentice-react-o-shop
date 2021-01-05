import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
  const inputs = ['title', 'price', 'category', 'imageURL'];
  const categories = [
    { name: 'Bread', id: 'bread' },
    { name: 'Vegetables', id: 'vegetables' },
    { name: 'Fruits', id: 'fruits' },
    { name: 'Dairy', id: 'dairy' },
  ];

  const dispatch = useDispatch();

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
