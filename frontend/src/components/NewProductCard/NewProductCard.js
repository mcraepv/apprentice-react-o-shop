import React from 'react';

const NewProductCard = ({ imageURL, title, onClick }) => {
  return (
    <div
      className="card mb-3"
      style={{
        width: '300px',
      }}
      onClick={onClick}
    >
      <img
        className="card-img-top"
        src={imageURL}
        style={{
          display: 'block',
          maxWidth: '300px',
          maxHeight: '200px',
          width: 'auto',
          height: 'auto',
        }}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{title}</h5>
      </div>
    </div>
  );
};

export default NewProductCard;
