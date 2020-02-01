import axios from "axios";

import {
  ERRORS, ADD_RTSP_URL,GET_RTSP_BY_USER_REQUEST,
  GET_RTSP_BY_USER_SUCCESS,
  GET_RTSP_BY_USER_FAILURE,
  UPDATE_RTSP_SOCKET_DATA,
  UPDATE_RTSP_SOCKET_DATA_FAILURE,
  UPDATE_RTSP_SOCKET_DATA_SUCCESS
} from "./types";

export const getAllRtspUrlByUser = (userId) => async dispatch =>{
    try{
        const data = {
            user_id: userId
        }
        dispatch(request());
        const result = await axios.post('/api/user/find/rtsp/', data)
        dispatch(success(result.data));
    }
    catch(e){
        dispatch(failure(e.message));

    }    

    function request() { return { type: GET_RTSP_BY_USER_REQUEST } }
    function success(rtsp_urls) { return { type: GET_RTSP_BY_USER_SUCCESS, rtsp_urls } }
    function failure(error) { return { type: GET_RTSP_BY_USER_FAILURE, error } }
}


export const startSocketConnection = (userId) => async dispatch =>{
    try{
        const data = {
            user_id: userId
        }
        dispatch(request());
        await axios.post(`/api/rtsp/start`,data)
        dispatch(success());
    }
    catch(e){
        dispatch(failure(e.message));

    }    

    function request() { return { type: UPDATE_RTSP_SOCKET_DATA } }
    function success() { return { type: UPDATE_RTSP_SOCKET_DATA_SUCCESS } }
    function failure(error) { return { type: UPDATE_RTSP_SOCKET_DATA_FAILURE, error } }
}


// add rtsp url action
export const addRtspUrl = (userId, url , history) => async dispatch => {
   try{
        dispatch(request(userId, url));

        const data = {
            user_id : userId,
            url
        }

        await axios.post("/api/rtsp", data)
        history.push("/rtsp")
   }
   catch(e){
        dispatch({
            type: ERRORS,
            payload: {message: e.response.data}
        })
   }

   function request(userId,url) { return { type: ADD_RTSP_URL, userId,url } }

};
