import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentUserId = (userId) => ({
  type: UserActionTypes.SET_CURRENT_USER_ID,
  payload: userId,
});
