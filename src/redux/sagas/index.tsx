import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_PACKAGES_LIST } from '../actionTypes';
import { ActionFetchPackagesList, updatePackagesListAction } from '../actions';
import { PackageApi, PackagesList } from './PackageApi';

function* fetchPackagesList(action: ActionFetchPackagesList) {
  const {
    payload: { query, numResults }
  } = action;
  const searchResults: PackagesList = yield call(() => PackageApi.list(query, numResults));
  yield put(updatePackagesListAction(query, searchResults));
}

export default function* rootSaga(): SagaIterator {
  yield takeLatest(FETCH_PACKAGES_LIST, fetchPackagesList);
}
