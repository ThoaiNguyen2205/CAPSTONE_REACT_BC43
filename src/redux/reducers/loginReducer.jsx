import { createSlice } from '@reduxjs/toolkit'
import { history } from '../..';
import {getStorageJSON, http, saveStorageJSON, USER_LOGIN} from '../../util/config'
const initStateUserLogin = () => {
    let userLoginInit = {
        email:'',
        accessToken:''
    }

    if(getStorageJSON(USER_LOGIN)) {
        userLoginInit = getStorageJSON(USER_LOGIN);
    }
    return userLoginInit;
}
const initialState = {
    userLogin:initStateUserLogin()
}

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState,
  reducers: {
    loginAction:(state,action)=>{
        const userLogin = action.payload;
        state.userLogin = userLogin;

    }
  }
});

export const {loginAction} = loginReducer.actions

export default loginReducer.reducer

// ---------call Api----------
export const loginActionApi = (userLogin) => { 
    
    return async (dispatch) => {
        try {
            const res = await http.post(`/api/Users/signin`,userLogin);
          
            const action = loginAction(res.data.content);
           
            dispatch(action);

          
            saveStorageJSON(USER_LOGIN,res.data.content);
            history.push('/')
        }catch(err) {
            alert(err.response?.data.message);
            history.push('/login')
            
        }
  
    }
}