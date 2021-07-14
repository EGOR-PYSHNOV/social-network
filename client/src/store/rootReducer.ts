import { postReducer } from './post/reducer';
import { userReducer } from './user/reducer';
import { combineReducers } from 'redux';
import { postsReducer } from './posts/reducer';
import { dialogsReducer } from './dialogs/reducer';
import { messagesReducer } from './messages/reducer';
export const rootReducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
  user: userReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer,
});
