import {
  FetchSignUpActionInterface,
  SetUserDataActionInterface,
  SetUserLoadingStatusActionInterface,
  FetchUserDataActionInterface,
  UserActionsType,
  SignOutActionInterface,
  VerifyEmailActionInterface,
  FetchSignInActionInterface,
  SetVerifyEmailStatusActionInterface,
  SetMeIdActionInterface,
} from './contracts/actionTypes';
import { UserState, ISignUp } from './contracts/state';

export const setUserData = (payload: UserState['data']): SetUserDataActionInterface => ({
  type: UserActionsType.SET_USER_DATA,
  payload,
});

export const setMeId = (payload: string): SetMeIdActionInterface => ({
  type: UserActionsType.SET_ME_ID,
  payload,
});

export const signOut = (): SignOutActionInterface => ({
  type: UserActionsType.SIGN_OUT,
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
});

export const verifyEmailUser = (payload: string): VerifyEmailActionInterface => ({
  type: UserActionsType.VERIFY_EMAIL,
  payload,
});

export const verifyEmailStatus = (payload: boolean): SetVerifyEmailStatusActionInterface => ({
  type: UserActionsType.VERIFY_EMAIL_STATUS,
  payload,
});

export const fetchSignUp = (payload: ISignUp): FetchSignUpActionInterface => ({
  type: UserActionsType.FETCH_SIGN_UP,
  payload,
});

export const fetchSignIn = (
  payload: Pick<ISignUp, 'username' | 'password'>,
): FetchSignInActionInterface => ({
  type: UserActionsType.FETCH_SIGN_IN,
  payload,
});

export const setUserLoadingStatus = (
  payload: UserState['status'],
): SetUserLoadingStatusActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});
