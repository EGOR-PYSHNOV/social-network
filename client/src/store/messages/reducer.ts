import { MessageActionsType, MessagesActions } from './contracts/actionTypes';
import { MessagesState } from './contracts/state';
import produce, { Draft } from 'immer';
import { LoadingStatus } from '../types';

const initialPostsState: MessagesState = {
  messages: [],
  LoadingStatus: LoadingStatus.NEVER,
};

export const messagesReducer = produce((draft: Draft<MessagesState>, action: MessagesActions) => {
  switch (action.type) {
    case MessageActionsType.SET_MESSAGES:
      draft.messages = action.payload;
      draft.LoadingStatus = LoadingStatus.LOADED;
      break;

    case MessageActionsType.FETCH_MESSAGES:
      draft.LoadingStatus = LoadingStatus.LOADING;
      break;

    case MessageActionsType.ADD_MESSAGE:
      draft.messages.push(action.payload);

      break;

    case MessageActionsType.UPDATE_MESSAGE_READ_STATUS:
      draft.messages = draft.messages.map((message) => {
        if (message.dialog?._id === action.payload) {
          message.read = true;
        }
        return message;
      });

      break;

    default:
      break;
  }
}, initialPostsState);
