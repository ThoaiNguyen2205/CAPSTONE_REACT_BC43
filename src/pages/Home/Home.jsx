import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductApi } from "../../redux/reducers/productReducer";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { arrProduct } = useSelector((state) => state.productReducer);
  console.log(arrProduct);
  const dispatch = useDispatch();
  const getProductApi = () => {
    const action = getAllProductApi();
    dispatch(action);
  };
  useEffect(() => {
    getProductApi();
  }, []);
  return (
    <div>
      <section className="my-carousel">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img/banner-giay.png"
                className="d-block w-100"
                alt="img-6"
              />
            </div>
            <div className="carousel-item">
              <img
                src="./img/banner-5.jpeg"
                className="d-block w-100"
                alt="img-6"
              />
            </div>
            <div className="carousel-item">
              <img
                src="./img/banner-3.jpeg"
                className="d-block w-100"
                alt="img-6"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icons" aria-hidden="true">
              <img src="./img/Polygon 2.png" alt="" />
            </span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icons" aria-hidden="true">
              <img src="./img/polygon 1.png" alt="" />
            </span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="product my-5 container">
        <h1 class="text-center my-5">- Product Feature -</h1>
        <div className="row">
          {arrProduct.map((prod, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="card">
                  <div className="cards-img">
                    <img src={prod.image} alt="" />
                  </div>
                  <div className="card-body">
                    <h3>{prod.name}</h3>
                    <p>
                      {prod.description.length > 89
                        ? prod.description.substr(0, 89) + " ....."
                        : prod.description}
                    </p>
                  </div>
                  <div className="cards-footer d-flex justify-content-around align-items-center">
                    <NavLink to={`/detail/${prod.id}`} className="btn">
                      Buy now
                    </NavLink>
                    <span className="text-center">{prod.price} $</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
