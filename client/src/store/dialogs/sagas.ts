import { DialogsState, IDialog } from './contracts/state';
import { setDialogs, setCurrentDialog, updateDialogNewMessages } from './actionCreators';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DialogsActionsType,
  CreateDialogActionInterface,
  GetDialogActionInterface,
} from './contracts/actionTypes';
import { ChatApi } from '../../api/ChatApi';
import { selectMeId } from '../user/selectors';
import { selectCurrentDialog } from './selectors';

export function* fetchDialogsRequest() {
  try {
    const currentDialog: DialogsState['currentDialog'] = yield select(selectCurrentDialog);
    const items: IDialog[] = yield call(ChatApi.fetchDialogs);

    yield put(setDialogs(items));

    const isCurrentDialog: boolean = items.some(
      (item) => item.lastMessage.dialog?._id === currentDialog.id,
    );

    if (isCurrentDialog) {
      yield put(updateDialogNewMessages(currentDialog.id));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchCreateDialogRequest({ payload }: CreateDialogActionInterface) {
  try {
    yield call(ChatApi.createDialog, payload);
  } catch (error) {
    console.log(error);
  }
}

export function* fetchGetDialogRequest({ payload }: GetDialogActionInterface) {
  try {
    const meId: string = yield select(selectMeId);
    const dialog: IDialog = yield call(ChatApi.getDialog, payload);

    yield put(
      setCurrentDialog({
        id: payload,
        user: meId === dialog.author._id ? dialog.partner : dialog.author,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function* dialogsSaga() {
  yield takeLatest(DialogsActionsType.FETCH_DIALOGS, fetchDialogsRequest);
  yield takeLatest(DialogsActionsType.CREATE_DIALOG, fetchCreateDialogRequest);
  yield takeLatest(DialogsActionsType.GET_DIALOG, fetchGetDialogRequest);
}
