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

export const selectLiked = createSelector(
  [selectQuestion],
  (question) => question.liked
);

export const selectComments = createSelector(
  [selectQuestion],
  (question) => question.comments
);

export const selectFavComments = createSelector(
  [selectQuestion],
  (question) => question.favComments
);

export const selectFavLiked = createSelector(
  [selectQuestion],
  (question) => question.favLiked
);