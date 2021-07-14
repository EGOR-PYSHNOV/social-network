import { all } from 'redux-saga/effects';
import { dialogsSaga } from './dialogs/sagas';
import { messagesSaga } from './messages/sagas';
import { postSaga } from './post/sagas';
import { postsSaga } from './posts/sagas';
import { userSaga } from './user/sagas';

export default function* rootSaga() {
  yield all([postsSaga(), postSaga(), userSaga(), dialogsSaga(), messagesSaga()]);
}
