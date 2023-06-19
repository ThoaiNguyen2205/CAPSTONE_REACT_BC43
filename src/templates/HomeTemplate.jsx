import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import "../assets/scss/base/base.scss";
export default function HomeTemplate() {
  return (
    <div>
      <Header />
      <Navigation />
      <div style={{ minHeight: "70vh" }}>
        <Outlet />
      </div>

      <Footer />
      <a id="button">
        <i class="fa fa-arrow-up"></i>
      </a>
    </div>
  );
}
