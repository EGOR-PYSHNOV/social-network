import { IMessage, MessagesState } from './state';
import { Action } from 'redux';

export enum MessageActionsType {
  SET_MESSAGES = 'dialogs/messages/SET_MESSAGES',
  FETCH_MESSAGES = 'dialogs/messages/FETCH_MESSAGES',
  FETCH_ADD_MESSAGE = 'dialogs/message/FETCH_ADD_MESSAGE',
  ADD_MESSAGE = 'dialogs/message/ADD_MESSAGE',
  UPDATE_MESSAGE_READ_STATUS = 'dialogs/message/UPDATE_MESSAGE_READ_STATUS',
}

export interface SetMessagesActionInterface extends Action<MessageActionsType> {
  type: MessageActionsType.SET_MESSAGES;
  payload: MessagesState['messages'];
}

export interface FetchMessagesActionInterface extends Action<MessageActionsType> {
  type: MessageActionsType.FETCH_MESSAGES;
  payload: string;
}

export interface AddMessageActionInterface extends Action<MessageActionsType> {
  type: MessageActionsType.ADD_MESSAGE;
  payload: IMessage;
}

export interface FetchAddMessage extends Action<MessageActionsType> {
  type: MessageActionsType.FETCH_ADD_MESSAGE;
  payload: { text: string; dialogId: string };
}

export interface UpdateReadedStatusActionInterface extends Action<MessageActionsType> {
  type: MessageActionsType.UPDATE_MESSAGE_READ_STATUS;
  payload: string;
}

export type MessagesActions =
  | SetMessagesActionInterface
  | FetchMessagesActionInterface
  | AddMessageActionInterface
  | FetchAddMessage
  | UpdateReadedStatusActionInterface;
