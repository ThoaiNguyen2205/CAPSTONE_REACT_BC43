import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer-content">
          <div className="row">
            <div className="col-4">
              <h3>GET HELP</h3>
              <ul>
                <li>
                  <NavLink to="">Home</NavLink>
                </li>
                <li>
                  <a href="#">Nike</a>
                </li>
                <li>
                  <a href="#">Adidas</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-4 border-start">
              <h3>SUPPORT</h3>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Phone</a>
                </li>
              </ul>
            </div>
            <div className="col-4 border-start">
              <h3>REGISTER</h3>
              <ul>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-content content-bottom">
          <i className="fa fa-copyright me-2"></i>
          2022 Cybersoft All Right Reserved | Design Theme by Trương Tấn Khải
        </div>
      </div>
    </footer>
  );
}
