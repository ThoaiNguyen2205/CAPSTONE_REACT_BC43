import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import ModalSearch from "../Modals/ModalSearch";

const Search = () => {
  const keywordRef = useRef("");
  const [arrProSearch, setArrProSearch] = useState([]);
  const [keyword, serKeyword] = useSearchParams();
  useEffect(() => {
    const kWord = keyword.get("key");
    if (kWord !== "") {
      getProdByKeyword(kWord);
    }
  }, [keyword.get("key")]);
  const getProdByKeyword = async (keyword) => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
      method: "GET",
    });
    setArrProSearch(result.data.content);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    keywordRef.current = value;
    //gọi api
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Đưa keyword lên params
    serKeyword({
      key: keywordRef.current,
    });
  };
  const { arrProductCart } = useSelector((state) => state.productReducer);
  let total = arrProductCart.reduce((tls, prod, index) => {
    return (tls += prod.quantityCart);
  }, 0);
  return (
    <div className="container">
      <h3
        className="my-3 d-inline-block p-2 rounded text-white w-25  align-items-center"
        style={{
          background:
            "linear-gradient(270deg, rgba(62, 32, 248, 0.9) 5.14%, #d017ee 89.71%)",
        }}
      >
        Search products
      </h3>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          id="keyword"
          className="form-control d-inline w-25 my-3"
          onInput={handleChange}
        />
        <button className="btn btn-primary">
          {" "}
          <i className="fa fa-search"></i>
        </button>
      </form>
      <h4>
        Found results {keyword.get("key") + `...`} ({arrProSearch.length})
      </h4>
      <div className="row">
        {arrProSearch.map((item, index) => {
          return (
            <div className="col-3 mt-2" key={index}>
              <div className="card" style={{ minHeight: 500 }}>
                <img src={item.image} alt="" />
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <NavLink className={"btn btn-dark"} to={`/detail/${item.id}`}>
                    View detail
                  </NavLink>
                  <NavLink className={"btn btn-success"} to="/cart">
                    Your Cart ({total})
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
