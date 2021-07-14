import { AuthApi } from './../../api/AuthApi';
import { LoadingStatus, UserStatus } from './../types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setUserLoadingStatus, setUserData, verifyEmailStatus, setMeId } from './actionCreators';
import {
  FetchSignInActionInterface,
  FetchSignUpActionInterface,
  UserActionsType,
  VerifyEmailActionInterface,
} from './contracts/actionTypes';

export function* fetchSignUpRequest({ payload }: FetchSignUpActionInterface) {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    yield call(AuthApi.signUp, payload);
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchSignInRequest({ payload }: FetchSignInActionInterface) {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthApi.signIn, payload);
    window.localStorage.setItem('token', data.token);
    yield put(setUserData(data));
    yield put(setMeId(data._id));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUserDataRequest() {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthApi.getMe);

    yield put(setUserData(data));
    yield put(setMeId(data._id));
  } catch (error) {
    yield put(setUserLoadingStatus(UserStatus.UNAUTHORIZED));
  }
}

export function* verifyEmailRequest({ payload }: VerifyEmailActionInterface) {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { status, data } = yield call(AuthApi.verify, payload);

    if (status === 'success') {
      window.localStorage.setItem('token', data.token);
      yield put(verifyEmailStatus(true));
    } else {
      yield put(verifyEmailStatus(false));
    }

    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* userSaga() {
  yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
  yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
  yield takeLatest(UserActionsType.VERIFY_EMAIL, verifyEmailRequest);
  yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
}
