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
              <NavLink to="/search?key=adidas" className="menu-opacity">
                Adidas
              </NavLink>
            </li>
            <li>
              <NavLink to="/search?key=nike" className="menu-opacity">
                Nike
              </NavLink>
            </li>
            <li>
              <NavLink to="/search?key=van">Van</NavLink>
            </li>
            <li>
              <NavLink to="/search?key=converse">Converse</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
