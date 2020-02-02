import { ADD_RTSP_URL,
         GET_RTSP_BY_USER_REQUEST,
         GET_RTSP_BY_USER_SUCCESS,
         GET_RTSP_BY_USER_FAILURE,
         UPDATE_RTSP_SOCKET_DATA,
         UPDATE_RTSP_SOCKET_DATA_SUCCESS,
         UPDATE_RTSP_SOCKET_DATA_FAILURE
    } from '../actions/types';

const initialState = {
    rtsp_urls: [ ],
    loading:false,
    rtsp_data_loading:false,
};

function rtspReducer(state = initialState, action){
    switch (action.type) {
        case GET_RTSP_BY_USER_REQUEST:
            return {loading: true};
        case UPDATE_RTSP_SOCKET_DATA:
             return { rtsp_data_loading: true }; 
        case UPDATE_RTSP_SOCKET_DATA_SUCCESS:
            return {...state};   
        case UPDATE_RTSP_SOCKET_DATA_FAILURE:
            return { error: action.error};             
        case GET_RTSP_BY_USER_SUCCESS:
            return {
                ...state,
                rtsp_urls:action.rtsp_urls
            };
        case GET_RTSP_BY_USER_FAILURE:
            return {  error: action.error };    
        case ADD_RTSP_URL:
            return { url_added: true };
        default:
          return state;
      }
}

export default rtspReducer;