import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAction,
  changeQuantityCart,
  changeQuantityDetail,
  getAllProductApi,
} from "../../redux/reducers/productReducer";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/pages/detail.scss";
import { httpProduct, setStoreJson } from "../../util/config";
const Detail = () => {
  const [productDetail, setProductDetail] = useState({
    id: 2,
    name: "Adidas Prophere Black White",
    alias: "adidas-prophere-black-white",
    price: 450,
    feature: false,
    description:
      "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
    size: ["36", "37", "38", "39", "40", "41", "42"],
    shortDescription:
      "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
    quantity: 990,
    image: "https://shop.cyberlearn.vn/images/adidas-prophere-black-white.png",
    categories: [
      {
        id: "ADIDAS",
        category: "ADIDAS",
      },
      {
        id: "MEN",
        category: "MEN",
      },
      {
        id: "WOMEN",
        category: "WOMEN",
      },
    ],
    relatedProducts: [
      {
        id: 1,
        name: "Adidas Prophere",
        alias: "adidas-prophere",
        feature: false,
        price: 350,
        description:
          "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        shortDescription:
          "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
      },
      {
        id: 4,
        name: "Adidas Super Star Red",
        alias: "adidas-super-star-red",
        feature: false,
        price: 465,
        description:
          "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        shortDescription:
          "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        image: "https://shop.cyberlearn.vn/images/adidas-super-star-red.png",
      },
      {
        id: 6,
        name: "Adidas Tenisky Super Star",
        alias: "adidas-tenisky-super-star",
        feature: false,
        price: 250,
        description:
          "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        shortDescription:
          "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        image:
          "https://shop.cyberlearn.vn/images/adidas-tenisky-super-star.png",
      },
    ],
  });
  const params = useParams();
  console.log("id", params.id);
  const dispatch = useDispatch();
  useEffect(() => {
    //Call api lúc trang vừa load
    getProductDetailApi(params.id);
    console.log(params);
  }, [params.id]);

  const getProductDetailApi = async (id) => {
    const result = await httpProduct.get(`/api/product/getbyid?id=${id}`);

    //Đưa dữ liệu lấy tự api về vào state
    setProductDetail(result.data.content);
  };
  const addToCart = () => {
    const action = addToCartAction(productDetail);
    dispatch(action);
  };
  const { arrProductCart } = useSelector((state) => state.productReducer);

  return (
    <div>
      <div className="detail-product">
        <div className="container">
          <div className="row">
            <div className="col-5 ">
              <div className="detail-img">
                <img src={productDetail.image} alt />
              </div>
              <div className="bg-img">
                <img src="/img/1f7d6dc51c906c5fe36980662974d571.jpeg" alt />
              </div>
            </div>
            <div className="col-7">
              <h3>{productDetail.name}</h3>
              <p>{productDetail.description}</p>
              <h4>Avalable size</h4>
              <div className="btn-size">
                <button>{productDetail.size[0]}</button>
                <button>{productDetail.size[1]}</button>
                <button>{productDetail.size[2]}</button>
                <button>{productDetail.size[3]}</button>
                <button>{productDetail.size[4]}</button>
                <button>{productDetail.size[5]}</button>
                <button>{productDetail.size[6]}</button>
              </div>
              <h1>$ {productDetail.price}</h1>
              <p className="detail-quantity">
                Số lượng {productDetail.quantity}
              </p>
              {/* <div className="btn-increase">
                <button
                  className="btn increase"
                  onClick={() => {
                    const action = changeQuantityDetail({
                      id: productDetail.id,
                      quantity: 1,
                    });
                    dispatch(action);
                  }}
                >
                  +
                </button>
                <span className="mx-3 fs-3">1</span>
                <button
                  className="btn reduce"
                  onClick={() => {
                    const action = changeQuantityDetail({
                      id: productDetail.id,
                      quantity: -1,
                    });
                    dispatch(action);
                  }}
                >
                  -
                </button>
              </div> */}
              <NavLink to="/cart" className="btn btn-add" onClick={addToCart}>
                Add to cart
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <section className="product-item">
        <div className="container">
          <h1 className="text-center my-5">- Product Feature -</h1>
          <ul className="cards">
            {productDetail.relatedProducts.map((prod, index) => {
              return (
                <li className="cards-item" key={index}>
                  <div className="card">
                    <div className="card-image">
                      <img src={prod.image} alt />
                    </div>
                    <div className="card-content">
                      <div className="card-title">{prod.name}</div>
                      <p className="card-text">{prod.description}</p>
                    </div>
                    <div className="cards-footer d-flex justify-content-around align-items-center">
                      <NavLink to={`/detail/${prod.id}`} className="btn">
                        Buy now
                      </NavLink>
                      <span className="text-center">${prod.price}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Detail;
