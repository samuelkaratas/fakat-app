import { createSelector } from "reselect";

const selectQuestion = (state) => state.question;

export const selectChosenQuestion = createSelector(
  [selectQuestion],
  (question) => question.chosenQuestion
);

export const selectShowOptions = createSelector(
  [selectQuestion],
  (question) => question.showOptions
);
