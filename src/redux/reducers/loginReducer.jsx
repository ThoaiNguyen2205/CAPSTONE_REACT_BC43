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
    "ordersHistory": [
      {
        "orderDetail": [
          {
            "name": "Adidas Prophere Black White",
            "alias": "adidas-prophere-black-white",
            "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
            "quantity": 990,
            "price": 450,
            "image": "https://shop.cyberlearn.vn/images/adidas-prophere-black-white.png",
            "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n"
          }
        ],
        "id": 5447,
        "date": "2023-06-16T00:40:00",
        "status": null,
        "email": "nphuc1@gmail.com",
        "alias": ""
      },
      {
        "orderDetail": [
          {
            "name": "Adidas Prophere Black White",
            "alias": "adidas-prophere-black-white",
            "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
            "quantity": 990,
            "price": 450,
            "image": "https://shop.cyberlearn.vn/images/adidas-prophere-black-white.png",
            "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n"
          }
        ],
        "id": 5572,
        "date": "2023-06-17T01:18:30",
        "status": null,
        "email": "nphuc1@gmail.com",
        "alias": ""
      }
    ],
    "email": "nphuc1@gmail.com",
    "name": "hoangphuc",
    "password": null,
    "gender": false,
    "phone": "09617544212",
    "facebookId": "",
    "deleted": false,
    "avatar": "https://i.pravatar.cc?u=nphuc1@gmail.com"
  },
  "dateTime": "2023-06-18T00:45:54.7044255+07:00"
}

const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const userLogin = { ...action.payload };
      state.userLogin = userLogin;
    },
    getProfileAction: (state, action) => {
      const userProfile = action.payload;
      state.userProfile = userProfile;
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
