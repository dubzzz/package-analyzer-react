import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_MULTIPLE_PACKAGES_DETAILS } from '../actionTypes';
import {
  ActionFetchMultiplePackagesDetails,
  updatePackageDetailsAction,
  errorPackageDetailsAction,
  startMultiplePackagesDetailsAction
} from '../actions';
import { PackageApi, Deps } from './PackageApi';

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
  yield takeEvery(FETCH_MULTIPLE_PACKAGES_DETAILS, fetchMultiplePackagesDetails);
}
