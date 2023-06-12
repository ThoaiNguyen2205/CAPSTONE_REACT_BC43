import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <section className="menu-shoes">
      <div className="container-fluid">
        <div className="menu-content d-flex align-items-center">
          <ul>
            <li>
              <NavLink to="">Home</NavLink>
            </li>
            <li>
              <a href="#" className="menu-opacity">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="menu-opacity">
                Woman
              </a>
            </li>
            <li>
              <a href="#">Kid</a>
            </li>
            <li>
              <a href="#">Sport</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
