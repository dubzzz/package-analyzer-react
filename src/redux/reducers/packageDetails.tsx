import { Actions, ActionUpdatePackagesList, ActionFetchPackagesList } from '../actions';
import { PackagesList } from '../sagas/PackageApi';
import { UPDATE_PACKAGES_LIST, FETCH_PACKAGES_LIST } from '../actionTypes';

const initialState = {
  suggestions: {
    query: '',
    results: [] as PackagesList
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
    default:
      return state;
  }
}
