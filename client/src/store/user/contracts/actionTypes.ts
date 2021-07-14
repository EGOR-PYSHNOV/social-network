import { LoadingStatus, UserStatus } from './../../types';
import { Action } from 'redux';
import { User, ISignUp } from './state';

export enum UserActionsType {
  SET_USER_DATA = 'user/SET_USER_DATA',
  SET_ME_ID = 'user/SET_ME_ID',
  FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
  FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',
  FETCH_USER_DATA = 'user/FETCH_USER_DATA',
  SET_LOADING_STATE = 'user/SET_LOADING_STATE',
  SIGN_OUT = 'user/SIGN_OUT',
  VERIFY_EMAIL = 'user/VERIFY_EMAIL',
  VERIFY_EMAIL_STATUS = '/user/VERIFY_EMAIL_STATUS',
}

export interface SignOutActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SIGN_OUT;
}

export interface FetchSignInActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_IN;
  payload: Pick<ISignUp, 'username' | 'password'>;
}

export interface FetchSignUpActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_UP;
  payload: ISignUp;
}

export interface VerifyEmailActionInterface extends Action<UserActionsType> {
  type: UserActionsType.VERIFY_EMAIL;
  payload: string;
}

export interface SetVerifyEmailStatusActionInterface extends Action<UserActionsType> {
  type: UserActionsType.VERIFY_EMAIL_STATUS;
  payload: boolean;
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_USER_DATA;
  payload: User | undefined;
}

export interface SetMeIdActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_ME_ID;
  payload: string;
}

export interface SetUserLoadingStatusActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_STATE;
  payload: LoadingStatus | UserStatus;
}
export interface FetchUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_DATA;
}

export type UserActions =
  | SetUserDataActionInterface
  | SetMeIdActionInterface
  | SetUserLoadingStatusActionInterface
  | FetchUserDataActionInterface
  | VerifyEmailActionInterface
  | FetchSignUpActionInterface
  | FetchSignInActionInterface
  | SignOutActionInterface
  | SetVerifyEmailStatusActionInterface;
