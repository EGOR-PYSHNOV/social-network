import { MessagesState } from './messages/contracts/state';
import { DialogsState } from './dialogs/contracts/state';
import { UserState } from './user/contracts/state';
import { PostsState } from './posts/contracts/state';
import { rootReducer } from './rootReducer';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { PostState } from './post/contracts/state';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  posts: PostsState;
  post: PostState;
  user: UserState;
  dialogs: DialogsState;
  messages: MessagesState;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
