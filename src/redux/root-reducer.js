import { combineReducers } from "redux";

import questionReducer from "./question/question.reducer";

const rootReducer = combineReducers({
  question: questionReducer,
});

export default rootReducer;
