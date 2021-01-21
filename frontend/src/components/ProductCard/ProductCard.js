import React from 'react';

const ProductCard = (props) => {
  const { title, price, imageURL } = props;
  return (
    <div className="card">
      <img className="card-img-top" src={imageURL} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
