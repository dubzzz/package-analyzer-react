import {
  FETCH_PACKAGES_LIST,
  UPDATE_PACKAGES_LIST,
  ERROR_PACKAGES_LIST,
  SWITCH_TO_PACKAGE_DETAILS,
  UPDATE_PACKAGE_DETAILS,
  ERROR_PACKAGE_DETAILS,
  FETCH_MULTIPLE_PACKAGES_DETAILS,
  START_MULTIPLE_PACKAGES_DETAILS,
  SWITCH_TO_SEARCH_MODE
} from './actionTypes';
import { PackagesList, Deps } from './sagas/PackageApi';

export const fetchPackagesListAction = (query: string, numResults: number) => ({
  type: FETCH_PACKAGES_LIST,
  payload: { query, numResults }
});
export const updatePackagesListAction = (query: string, searchResults: PackagesList) => ({
  type: UPDATE_PACKAGES_LIST,
  payload: { query, searchResults }
});
export const errorPackagesListAction = (query: string, error: string) => ({
  type: ERROR_PACKAGES_LIST,
  payload: { query, error }
});
export const switchToSearchModeAction = () => ({
  type: SWITCH_TO_SEARCH_MODE,
  payload: {}
});
export const switchToPackageDetailsModeAction = (packageName: string) => ({
  type: SWITCH_TO_PACKAGE_DETAILS,
  payload: { packageName }
});
export const fetchMultiplePackagesDetailsAction = (packages: string[]) => ({
  type: FETCH_MULTIPLE_PACKAGES_DETAILS,
  payload: { packages }
});
export const startMultiplePackagesDetailsAction = (packages: string[]) => ({
  type: START_MULTIPLE_PACKAGES_DETAILS,
  payload: { packages }
});
export const updatePackageDetailsAction = (packageName: string, deps: Deps) => ({
  type: UPDATE_PACKAGE_DETAILS,
  payload: { packageName, deps }
});
export const errorPackageDetailsAction = (packageName: string, error: string) => ({
  type: ERROR_PACKAGE_DETAILS,
  payload: { packageName, error }
});

export type ActionFetchPackagesList = ReturnType<typeof fetchPackagesListAction>;
export type ActionUpdatePackagesList = ReturnType<typeof updatePackagesListAction>;
export type ActionErrorPackagesList = ReturnType<typeof errorPackagesListAction>;
export type ActionSwitchToPackageDetailsMode = ReturnType<typeof switchToPackageDetailsModeAction>;
export type ActionFetchMultiplePackagesDetails = ReturnType<typeof fetchMultiplePackagesDetailsAction>;
export type ActionStartMultiplePackagesDetails = ReturnType<typeof startMultiplePackagesDetailsAction>;
export type ActionUpdatePackageDetails = ReturnType<typeof updatePackageDetailsAction>;
export type ActionErrorPackageDetails = ReturnType<typeof errorPackageDetailsAction>;
export type Actions =
  | ActionFetchPackagesList
  | ActionUpdatePackagesList
  | ActionErrorPackagesList
  | ActionSwitchToPackageDetailsMode
  | ActionFetchMultiplePackagesDetails
  | ActionStartMultiplePackagesDetails
  | ActionUpdatePackageDetails
  | ActionErrorPackageDetails;
