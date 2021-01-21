import React, { useState, useEffect } from 'react';

import NewProductCard from '../../components/NewProductCard/NewProductCard';
import ProductOptionCheck from '../../components/ProductOptionCheck/ProductOptionCheck';

const ProductSortTwo = ({ products, sortButtonClickHandler }) => {
  const [cards, setCards] = useState([]);
  const [productChecks, setProductChecks] = useState({});
  const [optionChecks, setOptionChecks] = useState([]);

  const addToCart = (id) => {
    console.log(id);
  };

  const renderCard = (title, imageURL, onClick) => (
    <div className="col-lg-4 col-6 d-flex justify-content-center" key={title}>
      <NewProductCard imageURL={imageURL} title={title} onClick={onClick} />
    </div>
  );

  const renderProducts = (products) => {
    const availableDepartments = [];
    const availableSubCategories = [];
    const availableBrands = [];
    const availableDeliveries = [];
    const productCards = [];
    products.forEach(
      ({
        title,
        imageURL,
        brand,
        deliveryOption,
        department,
        subCategoryOne,
      }) => {
        productCards.push(
          renderCard(title, imageURL, () => {
            addToCart(title);
          })
        );
        availableBrands.push(brand);
        availableDeliveries.push(deliveryOption);
        availableDepartments.push(department);
        availableSubCategories.push(subCategoryOne);
      }
    );
    renderOptionChecks(
      [...new Set(availableBrands)],
      [...new Set(availableDeliveries)],
      [...new Set(availableDepartments)],
      [...new Set(availableSubCategories)]
    );
    setCards(() => productCards);
  };

  const handleOptionsClick = (key, value, checked) => {
    if (checked) {
      setProductChecks((productChecks) => ({
        ...productChecks,
        [key]: value,
      }));
    } else {
      setProductChecks((oldChecks) => {
        const newChecks = {};

        Object.entries(oldChecks).forEach(([previousKey, previousValue]) => {
          if (previousValue !== value) {
            newChecks[previousKey] = previousValue;
          }
        });
        return newChecks;
      });
    }
  };

  const productCheck = (checkObject) => {
    const passedProducts = [];
    const objectEntries = Object.entries(checkObject);
    products.forEach((product) => {
      let count = 0;

      objectEntries.forEach(([key, value]) => {
        if (product[key] === value) {
          count++;
        }
      });
      if (count === objectEntries.length) {
        passedProducts.push(product);
      }
    });
    renderProducts(passedProducts);
  };

  useEffect(() => {
    productCheck(productChecks);
  }, [productChecks]);

  const renderOptionChecks = (
    brands,
    deliveryOptions,
    departments,
    subCategories
  ) => {
    const departmentChecks = departments.map((department) => (
      <ProductOptionCheck
        key={department}
        value={department}
        clickHandler={({ target: { checked } }) => {
          handleOptionsClick('department', department, checked);
        }}
      />
    ));
    const subCategoryChecks = subCategories.map((subCategory) => (
      <ProductOptionCheck
        key={subCategory}
        value={subCategory}
        clickHandler={({ target: { checked } }) => {
          handleOptionsClick('subCategoryOne', subCategory, checked);
        }}
      />
    ));
    const brandChecks = brands.map((brand) => (
      <ProductOptionCheck
        key={brand}
        value={brand}
        clickHandler={({ target: { checked } }) => {
          handleOptionsClick('brand', brand, checked);
        }}
      />
    ));
    const deliveryChecks = deliveryOptions.map((option) => (
      <ProductOptionCheck
        key={option}
        value={option}
        clickHandler={({ target: { checked } }) => {
          handleOptionsClick('deliveryOption', option, checked);
        }}
      />
    ));
    const isAvailableCheck = (
      <ProductOptionCheck
        key={'available'}
        value={'available'}
        clickHandler={({ target: { checked } }) => {
          handleOptionsClick('available', true, checked);
        }}
      />
    );
    const giftEligibleCheck = (
      <ProductOptionCheck
        key={'giftEligible'}
        value={'giftEligible'}
        clickHandler={({ target: { checked } }) => {
          handleOptionsClick('giftEligible', true, checked);
        }}
      />
    );

    const newChecks = [
      ...departmentChecks,
      ...subCategoryChecks,
      ...brandChecks,
      ...deliveryChecks,
      isAvailableCheck,
      giftEligibleCheck,
    ];

    const checksToRender = [];

    newChecks.forEach((newCheck) => {
      let count = 0;
      optionChecks.forEach((oldCheck) => {
        if (newCheck.key === oldCheck.key) {
          count++;
          checksToRender.push(oldCheck);
        }
      });
      if (count) {
        return;
      } else {
        checksToRender.push(newCheck);
      }
    });

    setOptionChecks(checksToRender);
  };

  useEffect(() => {
    renderProducts(products);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <div className="d-flex flex-column">{optionChecks}</div>
        </div>
        <div className="col-10">
          <div className="row">{cards}</div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={sortButtonClickHandler}
          >
            Change Filter Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSortTwo;
