import { combineReducers } from "redux";

import questionReducer from "./question/question.reducer";
import userReducer from './user/user.reducer'

const rootReducer = combineReducers({
  question: questionReducer,
  user: userReducer
});

export default rootReducer;
