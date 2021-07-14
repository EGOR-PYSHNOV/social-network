import { UserActions } from './contracts/actionTypes';

import { LoadingStatus } from './../types';
import produce, { Draft } from 'immer';

import { UserActionsType } from './contracts/actionTypes';
import { UserState } from './contracts/state';

const initialUserState: UserState = {
  data: undefined,
  status: LoadingStatus.NEVER,
  userId: null,
  isConfirmed: false,
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {
  switch (action.type) {
    case UserActionsType.SET_USER_DATA:
      draft.data = action.payload;
      draft.status = LoadingStatus.SUCCESS;
      break;

    case UserActionsType.SET_LOADING_STATE:
      draft.status = action.payload;
      break;

    case UserActionsType.SIGN_OUT:
      draft.status = LoadingStatus.LOADED;
      draft.data = undefined;
      break;

    case UserActionsType.VERIFY_EMAIL_STATUS:
      draft.isConfirmed = action.payload;
      break;
    case UserActionsType.SET_ME_ID:
      draft.userId = action.payload;
      break;
    default:
      break;
  }
}, initialUserState);
