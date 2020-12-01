import QuestionActionTypes from "./question.types";

const INITIAL_STATE = {
  questions: [],
  chosenQuestion: {},
  showOptions: true,
  index: 0,
  shownDilemmas: [],
  liked: undefined,
  comments: [],
  favComments: [],
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuestionActionTypes.INITIALIZE_DILEMMAS:
      return {
        ...state,
        questions: action.payload,
        chosenQuestion: {},
        showOptions: true,
        index: 0,
        shownDilemmas: [],
        favLiked: true,
        liked: undefined,
        comments: [],
      };
    case QuestionActionTypes.GET_QUESTION:
      const ind = Math.floor(Math.random() * state.questions.length);
      return {
        ...state,
        chosenQuestion: state.questions[ind],
        index: ind,
        liked: undefined,
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
    case QuestionActionTypes.TOGGLE_LIKE:
      return {
        ...state,
        liked: !state.liked,
      };
    case QuestionActionTypes.LIKE_AFTER_COMMENT:
      return {
        ...state,
        liked: true,
      };
    case QuestionActionTypes.TOGGLE_FAV_LIKE:
      return {
        ...state,
        favLiked: !state.favLiked,
      };
    case QuestionActionTypes.RESET_FAV_LIKE:
      return {
        ...state,
        favLiked: true,
      };
    case QuestionActionTypes.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case QuestionActionTypes.GET_FAV_COMMENTS:
      return {
        ...state,
        favComments: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;
