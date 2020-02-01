import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";
import rtspReducer from "./rtsp.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  rtsp: rtspReducer
});