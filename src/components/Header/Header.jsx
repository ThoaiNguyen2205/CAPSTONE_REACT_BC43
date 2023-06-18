import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { USER_LOGIN, clearStorage } from "../../util/config";

export default function Header() {
  const { arrProductCart } = useSelector((state) => state.productReducer);
  let total = arrProductCart.reduce((tls, prod, index) => {
    return (tls += prod.quantityCart);
  }, 0);

  const { userLogin } = useSelector((state) => state.loginReducer);

  const renderLoginLink = () => {
    if (userLogin.email !== "") {
      return (
        <ul>
          <li>
            <NavLink to="/search" className="btn btn-outline-secondary ">
              <i className="fa fa-search"></i> Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className=" btn btn-outline-secondary ">
              <span className="fs-5 me-2">({total})</span>
              <i className="fa fa-cart-plus"></i>
            </NavLink>
          </li>

          <li>
            <NavLink
              className=" btn btn-outline-secondary"
              onClick={() => {
                clearStorage(USER_LOGIN);
                window.location.reload(); //F5
              }}
            >
              <i className="fa fa-sign-in"></i> Logout
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/profile"
              className="btn btn-outline-success overflow-hidden rounded-circle"
              style={{ width: 30, height: 30, lineHeight: "30px", padding: 0 }}
            >
              {userLogin.email.substr(0, 1)}
            </NavLink>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li>
          <NavLink to="/search" className="btn btn-outline-secondary">
            <i className="fa fa-search"></i> Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="btn btn-outline-secondary ">
            <i className="fa fa-sign-in"></i> Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className="btn btn-outline-secondary ">
            <i className="fa fa-sign-in"></i> Register
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <header class="header">
        <div class="container-fluid">
          <div class="header-content d-flex justify-content-between align-items-center">
            <div class="header-logo">
              <NavLink to="/">
                <img src="./img/image 3.png" alt="" />
              </NavLink>
            </div>

            <div class="header-right">{renderLoginLink()}</div>
          </div>
        </div>
      </header>
    </div>
  );
}
