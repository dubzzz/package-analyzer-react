import { Actions, ActionRedirectToPage } from '../actions';
import { PackageSearchResult } from '../sagas/PackageApi';
import { REDIRECT_TO_PAGE, END_OF_REDIRECT } from '../actionTypes';

export enum PageType {
  SearchPage = 'search',
  DetailsPage = 'details'
}

export type RedirectToSearch = {
  page: PageType.SearchPage;
};
export type RedirectToDetails = {
  page: PageType.DetailsPage;
  packageName: string;
};
export type RedirectTo = RedirectToSearch | RedirectToDetails;

export type RouterState = RedirectTo & { hasToRedirect: boolean };
const initialState: RouterState = {
  page: PageType.SearchPage,
  hasToRedirect: false
};

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case REDIRECT_TO_PAGE: {
      const { payload } = action as ActionRedirectToPage;
      return { ...state, hasToRedirect: true, ...payload };
    }
    case END_OF_REDIRECT: {
      return { ...state, hasToRedirect: false };
    }
    default:
      return state;
  }
}
