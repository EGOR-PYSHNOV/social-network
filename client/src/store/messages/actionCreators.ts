import {
  SetMessagesActionInterface,
  MessageActionsType,
  FetchMessagesActionInterface,
  AddMessageActionInterface,
  FetchAddMessage,
  UpdateReadedStatusActionInterface,
} from './contracts/actionTypes';
import { IMessage, MessagesState } from './contracts/state';

export const setMessages = (payload: MessagesState['messages']): SetMessagesActionInterface => ({
  type: MessageActionsType.SET_MESSAGES,
  payload,
});

export const fetchMessages = (payload: string): FetchMessagesActionInterface => ({
  type: MessageActionsType.FETCH_MESSAGES,
  payload,
});

export const addMessage = (payload: IMessage): AddMessageActionInterface => ({
  type: MessageActionsType.ADD_MESSAGE,
  payload,
});

export const fetchAddMessage = (payload: { text: string; dialogId: string }): FetchAddMessage => ({
  type: MessageActionsType.FETCH_ADD_MESSAGE,
  payload,
});

export const updateReadedStatus = (payload: string): UpdateReadedStatusActionInterface => ({
  type: MessageActionsType.UPDATE_MESSAGE_READ_STATUS,
  payload,
});
