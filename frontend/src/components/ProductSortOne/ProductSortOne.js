import React, { useState, useEffect } from 'react';

import NewProductCard from '../../components/NewProductCard/NewProductCard';
import ProductOptionCheck from '../../components/ProductOptionCheck/ProductOptionCheck';

const ProductSortOne = ({
  productOptions: { departments },
  products,
  sortButtonClickHandler,
}) => {
  const [sortLevel, setSortLevel] = useState({
    ...departments,
    clicked: 'departments',
    previousLevel: '',
  });
  const [cards, setCards] = useState([]);
  const [optionChecks, setOptionChecks] = useState({
    optionElements: null,
    isRendered: false,
  });
  const [productChecks, setProductChecks] = useState({});

  const changeSortLevel = (clicked) => {
    const previousLevel = sortLevel.clicked;
    setSortLevel((sortLevel) => ({
      ...sortLevel[clicked],
      clicked,
      previousLevel,
    }));
  };

  const toPreviousLevel = ({ previousLevel }) => {
    const previousObject =
      previousLevel === 'departments'
        ? { ...departments, previousLevel: '' }
        : { ...departments[previousLevel], previousLevel: 'departments' };
    setOptionChecks(() => ({
      optionElements: null,
      isRendered: false,
    }));
    setSortLevel(() => ({ ...previousObject, clicked: previousLevel }));
  };

  const addToCart = (id) => {
    console.log(id);
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

  const renderProductOptions = (brands, deliveryOptions) => {
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
    return (
      <div className="row mb-3">
        {[
          ...brandChecks,
          ...deliveryChecks,
          isAvailableCheck,
          giftEligibleCheck,
        ]}
      </div>
    );
  };

  const renderCard = (title, imageURL, onClick) => (
    <div className="col-lg-4 col-6 d-flex justify-content-center" key={title}>
      <NewProductCard imageURL={imageURL} title={title} onClick={onClick} />
    </div>
  );

  const renderProducts = (products) => {
    const availableBrands = [];
    const availableDeliveries = [];
    const productCards = [];
    products.forEach(({ title, imageURL, brand, deliveryOption }) => {
      productCards.push(
        renderCard(title, imageURL, () => {
          addToCart(title);
        })
      );
      availableBrands.push(brand);
      availableDeliveries.push(deliveryOption);
    });
    setOptionChecks(() => ({
      isRendered: true,
      optionElements: renderProductOptions(
        [...new Set(availableBrands)],
        [...new Set(availableDeliveries)]
      ),
    }));
    setCards(() => productCards);
  };

  const renderCategoryCards = (object) => {
    const cardsArray = [];

    Object.entries(object).forEach(([key, { imageURL }]) => {
      if (
        key === 'imageURL' ||
        key === 'isSubCategory' ||
        key === 'clicked' ||
        key === 'previousLevel'
      )
        return;
      cardsArray.push(renderCard(key, imageURL, () => changeSortLevel(key)));

      setCards(() => cardsArray);
    });
  };

  useEffect(() => {
    if (sortLevel.isSubCategory)
      return setProductChecks((productChecks) => ({
        ...productChecks,
        subCategoryOne: sortLevel.clicked,
      }));
    renderCategoryCards(sortLevel);
  }, [sortLevel]);

  useEffect(() => {
    if (!Object.keys(productChecks).length) return;
    productCheck(productChecks);
  }, [productChecks]);

  return (
    <div>
      {optionChecks.isRendered ? optionChecks.optionElements : null}
      <div className="row">
        {cards.length ? (
          cards
        ) : (
          <div className="col my-3">
            <h2 className="text-center">No matching products</h2>
          </div>
        )}
      </div>
      <div className="row">
        {sortLevel.previousLevel ? (
          <div className="col text-right">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                toPreviousLevel(sortLevel);
              }}
            >
              To Previous Level
            </button>
          </div>
        ) : null}
        <div
          className={'col ' + (!sortLevel.previousLevel ? 'text-center' : '')}
        >
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

export default ProductSortOne;
