import { UserState } from './contracts/state';
import { RootState } from './../store';

export const selectUserState = (state: RootState): UserState => state.user;

export const selectUserData = (state: RootState): UserState['data'] => selectUserState(state).data;

export const selectMeId = (state: RootState): UserState['userId'] => selectUserState(state).userId;

export const selectConfirmStatus = (state: RootState): UserState['isConfirmed'] =>
  selectUserState(state).isConfirmed;

export const selectUserStatus = (state: RootState): UserState['status'] =>
  selectUserState(state).status;

export const selectAuthStatus = (state: RootState): boolean => !!selectUserState(state).data;
