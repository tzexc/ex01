import { ERRORS } from "../actions/types";
const initialState = {
    message:""
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERRORS:
      return action.payload;
    default:
      return state;
  }
}

export default errorReducer;