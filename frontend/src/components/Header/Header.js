import { React, useState } from 'react';
import './Header.module.scss';
import history from '../../utils/history';
import routePaths from '../../constants/routePaths';

const Header = () => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = (bool) => {
    setDropdown(!bool);
  };

  const dropdownMenu = (
    <div className="dropdown-menu show" aria-labelledby="dropdown01">
      <div
        className="dropdown-item"
        onClick={() => {
          history.push(routePaths.orders);
        }}
      >
        My Orders
      </div>
      <div
        className="dropdown-item"
        onClick={() => {
          history.push(routePaths.adminOrders);
        }}
      >
        Manage Orders
      </div>
      <div
        className="dropdown-item"
        onClick={() => {
          history.push(routePaths.adminProducts);
        }}
      >
        Manage Products
      </div>
      <div className="dropdown-item">Log Out</div>
    </div>
  );

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div
          className="navbar-brand"
          onClick={() => {
            history.push(routePaths.home);
          }}
        >
          React-O-Shop!
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <div
                className="nav-link"
                onClick={() => {
                  history.push(routePaths.home);
                }}
              >
                Home
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => {
                  history.push(routePaths.shoppingCart);
                }}
              >
                Shopping Cart
              </div>
            </li>
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="dropdown01"
                onClick={() => {
                  toggleDropdown(dropdown);
                }}
              >
                Username
              </div>
              {dropdown ? dropdownMenu : null}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
