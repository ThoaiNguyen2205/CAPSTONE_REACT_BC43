import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import "../assets/scss/base/base.scss";
import BackToTopButton from "../components/BackToTop/BackToTop";
export default function HomeTemplate() {
  return (
    <div>
      <Header />
      <Navigation />
      <div style={{ minHeight: "70vh" }}>
        <Outlet />
      </div>

      <Footer />
      <BackToTopButton />
    </div>
  );
}
