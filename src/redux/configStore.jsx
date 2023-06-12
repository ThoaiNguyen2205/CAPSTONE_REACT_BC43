import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/loginReducer";
import productReducer from "./reducers/productReducer";
export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    loginReducer,
  },
});
