import { Actions, ActionUpdatePackagesList, ActionErrorPackagesList } from '../actions';
import { PackageSearchResult } from '../sagas/PackageApi';
import { UPDATE_PACKAGES_LIST, ERROR_PACKAGES_LIST } from '../actionTypes';

type PackageDetailsState = {
  suggestions: {
    query: string;
    results: PackageSearchResult[];
    error?: string;
  };
};
const initialState: PackageDetailsState = {
  suggestions: {
    query: '',
    results: []
  }
};

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case UPDATE_PACKAGES_LIST: {
      const {
        payload: { query, searchResults }
      } = action as ActionUpdatePackagesList;
      return { ...state, suggestions: { query, results: searchResults } };
    }
    case ERROR_PACKAGES_LIST: {
      const {
        payload: { query, error }
      } = action as ActionErrorPackagesList;
      return { ...state, suggestions: { query, results: [], error } };
    }
    default:
      return state;
  }
}
