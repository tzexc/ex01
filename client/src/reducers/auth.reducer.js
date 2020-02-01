import { LOADING_USER, SET_CURRENT_USER } from '../actions/types';

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

function authReducer(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
          return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
          };
        case LOADING_USER:
          return {
            ...state,
            loading: true
          };
        default:
          return state;
      }
}

export default authReducer;