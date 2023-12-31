import { createSlice } from "@reduxjs/toolkit";
import {
  getStorageJSON,
  http,
  httpDetail,
  saveStorageJSON,
} from "../../util/config";

const initialState = {
  arrProduct: [],
  arrProductCart: [],
  productOrder: {
    orderDetail: [
      {
        productId: "",
        quantity: 0,
      },
    ],
    email: "",
  },
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    addToCartAction: (state, action) => {
      const prodAdd = { ...action.payload, quantityCart: 1 };
      const prodCart = state.arrProductCart.find(
        (item) => item.id === prodAdd.id
      );
      if (prodCart) {
        prodCart.quantityCart += 1;
      } else {
        state.arrProductCart.push(prodAdd);
        const cartJSON = state.arrProductCart;
        saveStorageJSON("arrCart", cartJSON);
      }
    },
    delProdCartAction: (state, action) => {
      let id = action.payload;
      let indexDel = state.arrProductCart.findIndex((prod) => prod.id === id);
      if (indexDel !== -1) {
        state.arrProductCart.splice(indexDel, 1);
      }
    },

    changeQuantityCart: (state, action) => {
      let { id, quantity } = action.payload;
      let prodCart = state.arrProductCart.find((item) => item.id === id);
      if (prodCart) {
        prodCart.quantityCart += quantity;
        if (prodCart.quantityCart < 1) {
          if (window.confirm("Bạn có muốn xoá sản phẩm này không ?")) {
            let indexDel = state.arrProductCart.findIndex(
              (prod) => prod.id === id
            );
            if (indexDel !== -1) {
              state.arrProductCart.splice(indexDel, 1);
            }
            return;
          } else {
            prodCart.quantityCart -= quantity;
          }
        }
      }
    },
  },
});

export const {
  getAllProductAction,
  getProductDetailAction,
  addToCartAction,
  changeQuantityDetail,
  changeQuantityCart,
  delProdCartAction,
} = productReducer.actions;

export default productReducer.reducer;

export const getAllProductApi = () => {
  return async (dispatch) => {
    const res = await http.get("/api/Product");
    const action = getAllProductAction(res.data.content);
    dispatch(action);
  };
};
