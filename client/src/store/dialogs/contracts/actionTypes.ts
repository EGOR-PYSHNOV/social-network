import { DialogsState } from './state';
import { Action } from 'redux';
import { User } from '../../user/contracts/state';

export enum DialogsActionsType {
  SET_DIALOGS = 'dialogs/SET_DIALOGS',
  FETCH_DIALOGS = 'dialogs/FETCH_DIALOGS',
  CREATE_DIALOG = 'dialogs/CREATE_DIALOG',
  GET_DIALOG = 'dialogs/GET_DIALOG',
  SET_CURRENT_DIALOG = 'dialog/SET_CURRENT_DIALOG',
  UPDATE_DIALOG_NEW_MESSAGE = 'dialogs/UPDATE_DIALOG_NEW_MESSAGE',
}

export interface SetDialogsActionInterface extends Action<DialogsActionsType> {
  type: DialogsActionsType.SET_DIALOGS;
  payload: DialogsState['dialogs'];
}

export interface FetchDialogsActionInterface extends Action<DialogsActionsType> {
  type: DialogsActionsType.FETCH_DIALOGS;
}

export interface SetCurrentDialogActionInterface extends Action<DialogsActionsType> {
  type: DialogsActionsType.SET_CURRENT_DIALOG;
  payload: {
    id: string;
    user: Pick<User, '_id' | 'fullname' | 'avatar'> | null;
  };
}

export interface GetDialogActionInterface extends Action<DialogsActionsType> {
  type: DialogsActionsType.GET_DIALOG;
  payload: string;
}

export interface CreateDialogActionInterface extends Action<DialogsActionsType> {
  type: DialogsActionsType.CREATE_DIALOG;
  payload: string;
}

export interface UpdateDialogNewMessageActionInterface extends Action<DialogsActionsType> {
  type: DialogsActionsType.UPDATE_DIALOG_NEW_MESSAGE;
  payload: string;
}

export type DialogsActions =
  | SetDialogsActionInterface
  | FetchDialogsActionInterface
  | CreateDialogActionInterface
  | GetDialogActionInterface
  | SetCurrentDialogActionInterface
  | UpdateDialogNewMessageActionInterface;
