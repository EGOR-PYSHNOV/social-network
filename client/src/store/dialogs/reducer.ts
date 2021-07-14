import { DialogsActions, DialogsActionsType } from './contracts/actionTypes';
import { DialogsState } from './contracts/state';
import produce, { Draft } from 'immer';
import { LoadingStatus } from '../types';

const initialPostsState: DialogsState = {
  dialogs: [],
  LoadingStatus: LoadingStatus.NEVER,
  currentDialog: {
    id: '',
    user: null,
  },
};

export const dialogsReducer = produce((draft: Draft<DialogsState>, action: DialogsActions) => {
  switch (action.type) {
    case DialogsActionsType.SET_DIALOGS:
      draft.dialogs = action.payload;
      draft.LoadingStatus = LoadingStatus.LOADED;
      break;

    case DialogsActionsType.FETCH_DIALOGS:
      draft.LoadingStatus = LoadingStatus.LOADING;
      break;

    case DialogsActionsType.SET_CURRENT_DIALOG:
      draft.currentDialog = {
        id: action.payload.id,
        user: action.payload.user,
      };
      break;

    case DialogsActionsType.UPDATE_DIALOG_NEW_MESSAGE:
      draft.dialogs = draft.dialogs.map((dialog) => {
        if (dialog._id === action.payload) {
          dialog.newMessages.count = 0;
        }

        return dialog;
      });
      break;

    default:
      break;
  }
}, initialPostsState);
