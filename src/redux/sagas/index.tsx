import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_PACKAGES_LIST, FETCH_MULTIPLE_PACKAGES_DETAILS } from '../actionTypes';
import {
  ActionFetchPackagesList,
  updatePackagesListAction,
  errorPackagesListAction,
  ActionFetchMultiplePackagesDetails,
  updatePackageDetailsAction,
  errorPackageDetailsAction,
  startMultiplePackagesDetailsAction
} from '../actions';
import { PackageApi, Deps } from './PackageApi';
import { SearchResponseType } from './models/searchResponseType';

function* fetchPackagesList(action: ActionFetchPackagesList) {
  const {
    payload: { query, numResults }
  } = action;
  try {
    const searchResults: SearchResponseType = yield call(() => PackageApi.list(query, numResults));
    yield put(updatePackagesListAction(query, searchResults));
  } catch (error) {
    yield put(errorPackagesListAction(query, (error as any).message || String(error)));
  }
}

function* fetchMultiplePackagesDetails(action: ActionFetchMultiplePackagesDetails) {
  const {
    payload: { packages }
  } = action;
  yield put(startMultiplePackagesDetailsAction(packages));
  for (const packageName of packages) {
    try {
      const depsDetails: Deps = yield call(() => PackageApi.deps(packageName));
      yield put(updatePackageDetailsAction(packageName, depsDetails));
    } catch (error) {
      yield put(errorPackageDetailsAction(packageName, (error as any).message || String(error)));
    }
  }
}

export default function* rootSaga(): SagaIterator {
  yield takeLatest(FETCH_PACKAGES_LIST, fetchPackagesList);
  yield takeEvery(FETCH_MULTIPLE_PACKAGES_DETAILS, fetchMultiplePackagesDetails);
}
