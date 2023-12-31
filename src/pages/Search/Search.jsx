import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import "../../assets/scss/pages/search.scss";

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
  const getAllProdByKeyword = async () => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product`,
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

  const sortDescrease = () => {
    const arrSort = [...arrProSearch];
    arrSort.sort((a, b) => (a.price > b.price ? -1 : 1));
    setArrProSearch(arrSort);
  };
  const sortAscending = () => {
    const arrSort = [...arrProSearch];
    arrSort.sort((a, b) => (a.price > b.price ? 1 : -1));
    setArrProSearch(arrSort);
  };

  return (
    <div className="container search">
      <h3 className="my-3 d-inline-block p-2 rounded text-primary  align-items-center">
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
        <button className="btn btn-primary ms-3" onClick={getAllProdByKeyword}>
          All
        </button>
      </form>

      <h4
        style={{
          background:
            "linear-gradient(270deg, rgba(62, 32, 248, 0.9) 5.14%, #d017ee 89.71%)",
        }}
        className="my-3 d-inline-block p-2 rounded text-white  align-items-center"
      >
        Found results {keyword.get("key") + `...`} ({arrProSearch.length})
      </h4>
      <div className="sort w-25 ">
        <h4 className="mt-4 text-danger">Price</h4>
        <div
          className=" d-flex justify-content-between align-items-center py-2"
          onClick={sortDescrease}
          style={{ cursor: "pointer", backgroundColor: "#a8d6ff" }}
        >
          <p className="mb-0">Descrease</p>
          <i class="fa fa-sort-amount-down"></i>
        </div>
        <div
          className=" mt-2 d-flex justify-content-between align-items-center py-2"
          onClick={sortAscending}
          style={{ cursor: "pointer", backgroundColor: "#a8d6ff" }}
        >
          <p className="mb-0">Ascending</p>
          <i class="fa fa-sort-amount-up"></i>
        </div>
      </div>
      <div className="row">
        {arrProSearch.map((item, index) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mt-2" key={index}>
              <div className="card">
                <img src={item.image} alt="" className="w-75" />
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p className="text-danger">{item.price} $</p>
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
