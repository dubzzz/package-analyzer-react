import {
  FETCH_PACKAGES_LIST,
  UPDATE_PACKAGES_LIST,
  ERROR_PACKAGES_LIST,
  SWITCH_TO_PACKAGE_DETAILS
} from './actionTypes';
import { PackagesList } from './sagas/PackageApi';

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
export const switchToPackageDetailsMode = (packageName: string) => ({
  type: SWITCH_TO_PACKAGE_DETAILS,
  payload: { packageName }
});

export type ActionFetchPackagesList = ReturnType<typeof fetchPackagesListAction>;
export type ActionUpdatePackagesList = ReturnType<typeof updatePackagesListAction>;
export type ActionErrorPackagesList = ReturnType<typeof errorPackagesListAction>;
export type ActionSwitchToPackageDetailsMode = ReturnType<typeof switchToPackageDetailsMode>;
export type Actions =
  | ActionFetchPackagesList
  | ActionUpdatePackagesList
  | ActionErrorPackagesList
  | ActionSwitchToPackageDetailsMode;
