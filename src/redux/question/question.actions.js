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
