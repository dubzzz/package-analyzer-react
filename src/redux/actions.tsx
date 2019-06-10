import {
  UPDATE_PACKAGE_DETAILS,
  ERROR_PACKAGE_DETAILS,
  FETCH_MULTIPLE_PACKAGES_DETAILS,
  START_MULTIPLE_PACKAGES_DETAILS,
  END_OF_REDIRECT,
  REDIRECT_TO_PAGE
} from './actionTypes';
import { Deps } from './sagas/PackageApi';
import { RedirectTo } from './reducers/router';

// details
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

// router
export const redirectToPageAction = (redirect: RedirectTo) => ({
  type: REDIRECT_TO_PAGE,
  payload: redirect
});
export const endOfRedirectAction = () => ({
  type: END_OF_REDIRECT,
  payload: {}
});

export type ActionFetchMultiplePackagesDetails = ReturnType<typeof fetchMultiplePackagesDetailsAction>;
export type ActionStartMultiplePackagesDetails = ReturnType<typeof startMultiplePackagesDetailsAction>;
export type ActionUpdatePackageDetails = ReturnType<typeof updatePackageDetailsAction>;
export type ActionErrorPackageDetails = ReturnType<typeof errorPackageDetailsAction>;
export type ActionRedirectToPage = ReturnType<typeof redirectToPageAction>;
export type ActionEndOfRedirect = ReturnType<typeof endOfRedirectAction>;
export type Actions =
  | ActionFetchMultiplePackagesDetails
  | ActionStartMultiplePackagesDetails
  | ActionUpdatePackageDetails
  | ActionErrorPackageDetails
  | ActionRedirectToPage
  | ActionEndOfRedirect;
