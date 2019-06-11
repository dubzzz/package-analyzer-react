import { END_OF_REDIRECT, REDIRECT_TO_PAGE } from './actionTypes';
import { RedirectTo } from './reducers/router';

// router
export const redirectToPageAction = (redirect: RedirectTo) => ({
  type: REDIRECT_TO_PAGE,
  payload: redirect
});
export const endOfRedirectAction = () => ({
  type: END_OF_REDIRECT,
  payload: {}
});

export type ActionRedirectToPage = ReturnType<typeof redirectToPageAction>;
export type ActionEndOfRedirect = ReturnType<typeof endOfRedirectAction>;
export type Actions = ActionRedirectToPage | ActionEndOfRedirect;
