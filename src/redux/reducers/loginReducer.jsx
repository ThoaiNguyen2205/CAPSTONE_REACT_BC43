import { createSlice } from "@reduxjs/toolkit";
import { history } from "../..";
import {
  getStorageJSON,
  http,
  saveStorageJSON,
  USER_LOGIN,
} from "../../util/config";
const initStateUserLogin = () => {
  let userLoginInit = {
    email: "",
    accessToken: "",
  };

  if (getStorageJSON(USER_LOGIN)) {
    userLoginInit = getStorageJSON(USER_LOGIN);
  }
  return userLoginInit;
};
const initialState = {
    userLogin:initStateUserLogin(),
    userProfile:{
        
    }

    
    
}


const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    loginAction:(state,action)=>{
        const userLogin = action.payload;
        state.userLogin = userLogin;

    },
<<<<<<< HEAD
    getProfileAction: (state, action) => {
      const userProfile = action.payload;
      state.userProfile = userProfile;
    },
  },
});

export const { loginAction, getProfileAction } = loginReducer.actions;
=======
    getProfileAction:(state,action)=>{
        const userProfile = action.payload;
        state.userProfile = userProfile;
    },
   
  }
});

export const {loginAction,getProfileAction} = loginReducer.actions



>>>>>>> origin/devPhuc

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
<<<<<<< HEAD
  };
};
//Cấu hình dùng chung cho tất cả request (yêu cầu gửi lên api)
http.interceptors.request.use(
  (config) => {
    //headers: (dev định nghĩa)
    //data (body): (lấy từ các input hoặc tham số từ phía client)
    config.headers = { ...config.headers };
    let token = getStorageJSON(USER_LOGIN)?.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.tokenCybersoft = `CybersoftDemo`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export const getProfileActionApi = () => {
  return async (dispatch, getState) => {
    // console.log(getState)
    const accessToken = getState().loginReducer.userLogin.accessToken;

    //Gọi api getprofile
    const res = await http.post(`/api/Users/getProfile`);

    const action = getProfileAction(res.data.content);
    dispatch(action);
  };
};
=======
}
}
export const getProfileActionApi=()=>{
    return async (dispatch,getState)=>{
    const accessToken = getState().loginReducer.userLogin.accessToken;
    const res = await http.post(`/api/Users/getProfile`,{},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    });
    console.log(res)

    const action = getProfileAction(res.data.content);
    dispatch(action);
}
}

>>>>>>> origin/devPhuc
