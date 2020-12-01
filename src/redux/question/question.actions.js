import QuestionActionTypes from "./question.types";

export const initializeDilemmas = (questions) => ({
  type: QuestionActionTypes.INITIALIZE_DILEMMAS,
  payload: questions,
});

export const getQuestion = () => ({
  type: QuestionActionTypes.GET_QUESTION,
});

export const toggleOptions = () => ({
  type: QuestionActionTypes.TOGGLE_OPTIONS,
});

export const addDilemaToShown = () => ({
  type: QuestionActionTypes.ADD_DILEMA_TO_SHOWN,
});

export const toggleLike = () => ({
  type: QuestionActionTypes.TOGGLE_LIKE,
});

export const getComments = (commentsArray) => ({
  type: QuestionActionTypes.GET_COMMENTS,
  payload: commentsArray,
});

export const likeAfterComment = () => ({
  type: QuestionActionTypes.LIKE_AFTER_COMMENT,
});

export const getFavComments = (commentsArray) => ({
  type: QuestionActionTypes.GET_FAV_COMMENTS,
  payload: commentsArray,
});

export const toggleFavLike = () => ({
  type: QuestionActionTypes.TOGGLE_FAV_LIKE,
});

export const resetFavLike = () => ({
  type: QuestionActionTypes.RESET_FAV_LIKE,
});