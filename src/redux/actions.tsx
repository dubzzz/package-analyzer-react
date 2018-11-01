import { FETCH_PACKAGES_LIST, UPDATE_PACKAGES_LIST, ERROR_PACKAGES_LIST } from './actionTypes';
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

export type ActionFetchPackagesList = ReturnType<typeof fetchPackagesListAction>;
export type ActionUpdatePackagesList = ReturnType<typeof updatePackagesListAction>;
export type ActionErrorPackagesList = ReturnType<typeof errorPackagesListAction>;
export type Actions = ActionFetchPackagesList | ActionUpdatePackagesList | ActionErrorPackagesList;
