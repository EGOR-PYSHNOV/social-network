import { setMessages } from './actionCreators';

import { call, put, takeLatest } from 'redux-saga/effects';

import { ChatApi } from '../../api/ChatApi';
import { IMessage } from './contracts/state';
import {
  MessageActionsType,
  FetchAddMessage,
  FetchMessagesActionInterface,
} from './contracts/actionTypes';

export function* fetchMessagesRequest({ payload }: FetchMessagesActionInterface) {
  try {
    const items: IMessage[] = yield call(ChatApi.fetchMessages, payload);

    yield put(setMessages(items));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchAddMessageRequest({ payload }: FetchAddMessage) {
  try {
    yield call(ChatApi.addMessage, payload);
  } catch (error) {
    console.log(error);
  }
}

export function* messagesSaga() {
  yield takeLatest(MessageActionsType.FETCH_MESSAGES, fetchMessagesRequest);
  yield takeLatest(MessageActionsType.FETCH_ADD_MESSAGE, fetchAddMessageRequest);
}
