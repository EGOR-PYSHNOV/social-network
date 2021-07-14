import { PostsApi } from '../../api/PostApi';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { IPost } from '../posts/contracts/state';
import { setPost, toggleLikePost, fetchAddCommentToPost, addCommentToPost } from './actionCreators';
import {
  FetchCommentToPostActionInterface,
  FetchToggleLikePostActionInterface,
  PostActionsType,
} from './contracts/actionTypes';
import { selectUserData } from '../user/selectors';
import { User } from '../user/contracts/state';

export function* fetchPostRequest() {
  try {
    const pathname = window.location.pathname;
    const postId = pathname.includes('/post') ? pathname.split('/').pop() : undefined;

    const post: IPost = yield call(PostsApi.fetchPostData, postId);
    yield put(setPost(post));
  } catch (error) {
    console.log('error');
  }
}

export function* fetchToggleLikePostRequest({ payload }: FetchToggleLikePostActionInterface) {
  try {
    const userLike: Pick<User, '_id' | 'fullname' | 'avatar'> = yield select(selectUserData);

    yield put(
      toggleLikePost({
        user: {
          _id: userLike._id,
          fullname: userLike.fullname,
          avatar: userLike.avatar,
        },
      }),
    );

    console.log(payload);

    yield call(PostsApi.toggleLikePost, payload);
  } catch (error) {
    console.log(error);
  }
}

export function* fetchAddCommentToPostRequest({ payload }: FetchCommentToPostActionInterface) {
  try {
    const pathname = window.location.pathname;
    const postId = pathname.includes('/post') ? pathname.split('/').pop() : undefined;

    const userComment: Pick<User, '_id' | 'fullname' | 'avatar'> = yield select(selectUserData);

    yield call(PostsApi.addCommentToPost, { id: postId, text: payload });
    yield put(
      addCommentToPost({
        user: userComment,
        text: payload,
      }),
    );
  } catch (error) {
    console.log('error');
  }
}

export function* postSaga() {
  yield takeLatest(PostActionsType.FETCH_POST, fetchPostRequest);
  yield takeLatest(PostActionsType.FETCH_TOGGLE_LIKE_POST, fetchToggleLikePostRequest);
  yield takeLatest(PostActionsType.FETCH_ADD_COMMENT_TO_POST, fetchAddCommentToPostRequest);
}
