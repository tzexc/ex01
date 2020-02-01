import axios from "axios";
import setAuthHeaderToken from "../core/setAuthHeaderToken";
import jwt_decode from "jwt-decode";

import {
  ERRORS,
  SET_CURRENT_USER,
  LOADING_USER
} from "./types";

// clean-error action
export const cleanErrors = () => dispatch => {
    dispatch({
        type: ERRORS,
        payload: {message: ""}
    })
};

// Register action
export const register = (userData, history) => async dispatch => {
    try{
        await axios.post("/api/user", userData)
        history.push("/login")
   }
   catch(e){
        dispatch({
            type: ERRORS,
            payload: {message: e.response.data}
        })
   }
};

// Login action
export const login = (userData, history) => async dispatch => {
   try{
        const res =  await axios.post("/api/auth", userData)
        const { token } = res.data;
        localStorage.setItem("user_token", token);
        setAuthHeaderToken(token);
        const userDecoded = jwt_decode(token);
        cleanErrors();
        dispatch(setCurrentUser(userDecoded));
        history.push("/dashboard")
   }
   catch(e){
        dispatch({
            type: ERRORS,
            payload: {message: e.response.data}
        })
   }
};

// Set user action
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

// set loading mode
export const setLoadingMode = () => {
  return {
    type: LOADING_USER
  };
};


// Set Logout action 
export const logout = () => dispatch => {
  localStorage.removeItem("user_token");
  setAuthHeaderToken(false);
  dispatch(setCurrentUser({}));
};