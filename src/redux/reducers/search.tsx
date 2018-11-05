import { Actions, ActionUpdatePackagesList, ActionErrorPackagesList } from '../actions';
import { UPDATE_PACKAGES_LIST, ERROR_PACKAGES_LIST } from '../actionTypes';
import { SearchObjectType } from '../sagas/models/searchResponseType';

export enum SearchQueryState {
  Success = 'success',
  Error = 'error'
}
export type SearchSuccessState = {
  state: SearchQueryState.Success;
  query: string;
  results: SearchObjectType[];
};
export type SearchErrorState = {
  state: SearchQueryState.Error;
  query: string;
  error: string;
};
export type SearchState = SearchSuccessState | SearchErrorState;
const initialState: SearchState = {
  state: SearchQueryState.Success,
  query: '',
  results: []
};

export default function(state = initialState, action: Actions): SearchState {
  switch (action.type) {
    case UPDATE_PACKAGES_LIST: {
      const {
        payload: { query, searchResults }
      } = action as ActionUpdatePackagesList;
      return { ...state, state: SearchQueryState.Success, query, results: searchResults };
    }
    case ERROR_PACKAGES_LIST: {
      const {
        payload: { query, error }
      } = action as ActionErrorPackagesList;
      return { ...state, state: SearchQueryState.Error, query, error };
    }
    default:
      return state;
  }
}
