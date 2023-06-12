import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityCart,
  changeQuantityDetail,
  delProdCartAction,
} from "../../redux/reducers/productReducer";

const Cart = () => {
  const { arrProductCart } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const totalCart = () => {
    let total = 0;
    for (let itemCart of arrProductCart) {
      total += itemCart.quantityCart * itemCart.price;
    }
    return total;
  };
  return (
    <div style={{ minHeight: "70vh" }} className="mt-5">
      <h1 className="my-5 text-center"> My Cart</h1>
      <table
        className="table text-center"
        style={{ backgroundColor: "rgb(237, 236, 236)" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {arrProductCart.map((prod, index) => {
            return (
              <tr key={index} className="align-middle">
                <td className="fs-5">{prod.id}</td>
                <td className="fs-5 text-success">{prod.name}</td>
                <td>
                  <img src={prod.image} alt="" width={70} height={70} />
                </td>
                <td className="text-danger fs-5">{prod.price} $</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const action = changeQuantityCart({
                        id: prod.id,
                        quantity: 1,
                      });
                      dispatch(action);
                    }}
                  >
                    +
                  </button>
                  <span className="mx-2">{prod.quantityCart}</span>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const action = changeQuantityCart({
                        id: prod.id,
                        quantity: -1,
                      });
                      dispatch(action);
                    }}
                  >
                    -
                  </button>
                </td>
                <td className="text-danger fs-5">
                  {(prod.price * prod.quantityCart).toLocaleString()} $
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const action = delProdCartAction(prod.id);
                      console.log(action);
                      dispatch(action);
                    }}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <h5 className="mt-2">
            Total:{" "}
            <span className="text-danger">{totalCart().toLocaleString()}$</span>
          </h5>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;
