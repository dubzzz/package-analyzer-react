import {
  Actions,
  ActionUpdatePackagesList,
  ActionErrorPackagesList,
  ActionSwitchToPackageDetailsMode,
  ActionStartMultiplePackagesDetails,
  ActionUpdatePackageDetails,
  ActionErrorPackageDetails
} from '../actions';
import { PackageSearchResult } from '../sagas/PackageApi';
import {
  UPDATE_PACKAGES_LIST,
  ERROR_PACKAGES_LIST,
  SWITCH_TO_PACKAGE_DETAILS,
  UPDATE_PACKAGE_DETAILS,
  ERROR_PACKAGE_DETAILS,
  START_MULTIPLE_PACKAGES_DETAILS,
  SWITCH_TO_SEARCH_MODE,
  END_OF_REDIRECT
} from '../actionTypes';

export enum DependenciesStatus {
  OnGoing = -1,
  Error = 0,
  Success = 1
}
export type PackageDescription = {
  status: DependenciesStatus;
  statusText?: string;
  dependencies: string[];
};
export type KnownDependencies = { [packageName: string]: PackageDescription };
export type PackageDetailsState = {
  suggestions: {
    query: string;
    results: PackageSearchResult[];
    error?: string;
  };
  packageDetailsMode?: string;
  knownDependencies: KnownDependencies;
  hasToRedirect: boolean;
};
const initialState: PackageDetailsState = {
  suggestions: {
    query: '',
    results: []
  },
  knownDependencies: {},
  hasToRedirect: false
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
    case SWITCH_TO_SEARCH_MODE: {
      return { ...state, hasToRedirect: true, packageDetailsMode: undefined };
    }
    case SWITCH_TO_PACKAGE_DETAILS: {
      const {
        payload: { packageName }
      } = action as ActionSwitchToPackageDetailsMode;
      return { ...state, hasToRedirect: true, packageDetailsMode: packageName };
    }
    case END_OF_REDIRECT: {
      return { ...state, hasToRedirect: false };
    }
    case START_MULTIPLE_PACKAGES_DETAILS: {
      const {
        payload: { packages }
      } = action as ActionStartMultiplePackagesDetails;
      const newDeps: KnownDependencies = {};
      for (const packageName of packages) {
        newDeps[packageName] = { status: DependenciesStatus.OnGoing, dependencies: [] };
      }
      return {
        ...state,
        knownDependencies: {
          ...state.knownDependencies,
          ...newDeps
        }
      };
    }
    case UPDATE_PACKAGE_DETAILS: {
      const {
        payload: { packageName, deps }
      } = action as ActionUpdatePackageDetails;
      return {
        ...state,
        knownDependencies: {
          ...state.knownDependencies,
          [packageName]: {
            status: DependenciesStatus.Success,
            dependencies: Object.keys(deps.collected.metadata.dependencies || [])
          }
        }
      };
    }
    case ERROR_PACKAGE_DETAILS: {
      const {
        payload: { packageName, error }
      } = action as ActionErrorPackageDetails;
      return {
        ...state,
        knownDependencies: {
          ...state.knownDependencies,
          [packageName]: { status: DependenciesStatus.Error, statusText: error, dependencies: [] }
        }
      };
    }
    default:
      return state;
  }
}
