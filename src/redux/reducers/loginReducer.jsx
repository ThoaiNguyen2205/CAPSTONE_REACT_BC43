import { createSlice } from "@reduxjs/toolkit";
import { history } from "../..";
import {
  getStorageJSON,
  http,
  httpDetail,
  httpup,
  saveStorageJSON,
  USER_LOGIN,
} from "../../util/config";
const initStateUserLogin = () => {
  let userLoginInit = {
    email: "",
    accessToken: "",
    name: "",
  };

  if (getStorageJSON(USER_LOGIN)) {
    userLoginInit = getStorageJSON(USER_LOGIN);
  }
  return userLoginInit;
};
const initialState = {
  userLogin: initStateUserLogin(),
  userProfile: {
    ordersHistory: [
      {
        orderDetail: [
          {
            name: "",
            alias: "",
            shortDescription: "",
            quantity: 990,
            price: 450,
            image: "",
            description: "",
          },
        ],
        id: "",
        date: "",
        status: "",
        email: "",
        alias: "",
      },
      // {
      //   orderDetail: [
      //     {
      //       name: "",
      //       alias: "",
      //       shortDescription: "",
      //       quantity: "",
      //       price: "",
      //       image: "",
      //       description: "",
      //     },
      //   ],
      //   id: "",
      //   date: "",
      //   status: null,
      //   email: "",
      //   alias: "",
      // },
    ],
    email: "",
    name: "",
    password: "",
    gender: "",
    phone: "",
    facebookId: "",
    deleted: "",
    avatar: "",
  },
  dateTime: "",
};

const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const userLogin = { ...action.payload };
      state.userLogin = userLogin;
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { loginAction, getProfileAction } = loginReducer.actions;

export default loginReducer.reducer;

// ---------call Api----------
export const loginActionApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const res = await http.post(`/api/Users/signin`, userLogin);

      const action = loginAction(res.data.content);

      dispatch(action);

      saveStorageJSON(USER_LOGIN, res.data.content);
      history.push("/profile");
    } catch (err) {
      alert(err.response?.data.message);
      history.push("/login");
    }
  };
};

export const getProfileActionApi = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().loginReducer.userLogin.accessToken;
    const res = await httpup.post(`/api/Users/getProfile`);
    const action = getProfileAction(res.data.content);
    dispatch(action);
  };
};
