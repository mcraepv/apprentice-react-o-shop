import React from 'react';
import Form from '../../components/Form/Form';
import productActions from '../../store/product/action';
import { useDispatch } from 'react-redux';

const AdminProducts = () => {
  const inputs = ['title', 'price', 'category', 'imageURL'];
  const categories = [
    { name: 'Bread', id: 'bread' },
    { name: 'Vegetables', id: 'vegetables' },
    { name: 'Fruits', id: 'fruits' },
    { name: 'Dairy', id: 'dairy' },
  ];

  const dispatch = useDispatch();

  return (
    <Form
      formType="New Product"
      handleSubmit={(inputs) => {
        dispatch(productActions.addProduct(inputs));
      }}
      inputsArray={inputs}
      categoriesArray={categories}
    />
  );
};

export default AdminProducts;
