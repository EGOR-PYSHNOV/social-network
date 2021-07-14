import { User } from '../user/contracts/state';
import {
  DialogsActionsType,
  SetDialogsActionInterface,
  FetchDialogsActionInterface,
  CreateDialogActionInterface,
  UpdateDialogNewMessageActionInterface,
  SetCurrentDialogActionInterface,
  GetDialogActionInterface,
} from './contracts/actionTypes';
import { DialogsState } from './contracts/state';

export const setDialogs = (payload: DialogsState['dialogs']): SetDialogsActionInterface => ({
  type: DialogsActionsType.SET_DIALOGS,
  payload,
});

export const fetchDialogs = (): FetchDialogsActionInterface => ({
  type: DialogsActionsType.FETCH_DIALOGS,
});

export const createDialog = (payload: string): CreateDialogActionInterface => ({
  type: DialogsActionsType.CREATE_DIALOG,
  payload,
});

export const getDialog = (payload: string): GetDialogActionInterface => ({
  type: DialogsActionsType.GET_DIALOG,
  payload,
});

export const setCurrentDialog = (payload: {
  id: string;
  user: Pick<User, '_id' | 'fullname' | 'avatar'> | null;
}): SetCurrentDialogActionInterface => {
  return {
    type: DialogsActionsType.SET_CURRENT_DIALOG,
    payload,
  };
};

export const updateDialogNewMessages = (
  payload: string,
): UpdateDialogNewMessageActionInterface => ({
  type: DialogsActionsType.UPDATE_DIALOG_NEW_MESSAGE,
  payload,
});
