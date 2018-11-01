import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_PACKAGES_LIST } from '../actionTypes';
import { ActionFetchPackagesList, updatePackagesListAction, errorPackagesListAction } from '../actions';
import { PackageApi, PackagesList } from './PackageApi';

function* fetchPackagesList(action: ActionFetchPackagesList) {
  const {
    payload: { query, numResults }
  } = action;
  try {
    const searchResults: PackagesList = yield call(() => PackageApi.list(query, numResults));
    yield put(updatePackagesListAction(query, searchResults));
  } catch (error) {
    yield put(errorPackagesListAction(query, (error as any).message || String(error)));
  }
}

export default function* rootSaga(): SagaIterator {
  yield takeLatest(FETCH_PACKAGES_LIST, fetchPackagesList);
}
