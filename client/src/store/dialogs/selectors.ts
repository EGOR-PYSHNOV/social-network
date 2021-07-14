import { DialogsState } from './contracts/state';
import { LoadingStatus } from '../types';

import { RootState } from '../store';

export const selectDialogsState = (state: RootState): DialogsState => state.dialogs;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
  selectDialogsState(state).LoadingStatus;

export const selectDialogs = (state: RootState) => selectDialogsState(state).dialogs;

export const selectIsDialogsLoaded = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADED;

export const selectCurrentDialog = (state: RootState) => selectDialogsState(state).currentDialog;
