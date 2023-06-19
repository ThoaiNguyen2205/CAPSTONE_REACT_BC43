import React, { useEffect } from "react";
import "../../assets/scss/base/base.scss";

const BackToTopButton = () => {
  useEffect(() => {
    const btn = document.getElementById("back-to-top-button");

    const handleScroll = () => {
      if (window.scrollY > 300) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    const handleButtonClick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    btn.addEventListener("click", handleButtonClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      btn.removeEventListener("click", handleButtonClick);
    };
  }, []);

  return (
    <button id="back-to-top-button" className="back-to-top-button">
      <i className="fa fa-arrow-up"></i>
    </button>
  );
};

export default BackToTopButton;
