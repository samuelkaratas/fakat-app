import QuestionActionTypes from "./question.types";

const INITIAL_STATE = {
  questions: [],
  chosenQuestion: {},
  showOptions: true,
  index: 0,
  shownDilemmas: [],
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuestionActionTypes.INITIALIZE_DILEMMAS:
      return {
        ...state,
        questions: action.payload,
      };
    case QuestionActionTypes.GET_QUESTION:
      const ind = Math.floor(Math.random() * state.questions.length);
      return {
        ...state,
        chosenQuestion: state.questions[ind],
        index: ind,
      };
    case QuestionActionTypes.TOGGLE_OPTIONS:
      return {
        ...state,
        showOptions: !state.showOptions,
      };
    case QuestionActionTypes.ADD_DILEMA_TO_SHOWN:
      state.questions.splice(state.index, 1);
      state.shownDilemmas.push(state.chosenQuestion);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default questionReducer;