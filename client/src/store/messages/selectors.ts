import { MessagesState } from './contracts/state';

import { LoadingStatus } from '../types';

import { RootState } from '../store';

export const selectMessagesState = (state: RootState): MessagesState => state.messages;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
  selectMessagesState(state).LoadingStatus;

export const selectMessages = (state: RootState) => selectMessagesState(state).messages;

export const selectIsMessagesLoaded = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADED ||
  selectLoadingStatus(state) === LoadingStatus.NEVER;
