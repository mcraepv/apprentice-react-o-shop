import React from 'react';
import Form from '../../components/Form/Form';

const AdminProducts = () => {
  const inputs = ['title', 'price', 'category', 'imageURL'];
  const categories = [
    { name: 'Bread', id: 'bread' },
    { name: 'Vegetables', id: 'vegetables' },
    { name: 'Fruits', id: 'fruits' },
    { name: 'Dairy', id: 'dairy' },
  ];

  return (
    <Form
      formType="New Product"
      handleSubmit={(inputs) => {
        //placeholder
        console.log(inputs);
      }}
      inputsArray={inputs}
      categoriesArray={categories}
    />
  );
};

export default AdminProducts;
