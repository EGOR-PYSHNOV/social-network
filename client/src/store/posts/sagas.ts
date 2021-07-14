import { User } from './../user/contracts/state';
import { selectUserData } from './../user/selectors';
import { LoadingStatus } from './../types';
import {
  setPosts,
  setPostsLoadingStatus,
  addPost,
  setAddFormState,
  toggleLikePost,
} from './actionCreators';
import { PostsApi } from './../../api/PostApi';
import { IPost, CreatePostState } from './contracts/state';
import {
  FetchAddPostActionInterface,
  PostsActionsType,
  RemovePostActionInterface,
  FetchToggleLikePostActionInterface,
  UpdatePostActionInterface,
} from './contracts/actionTypes';
import { call, put, select, takeLatest } from 'redux-saga/effects';

export function* fetchPostsRequest() {
  try {
    const pathname = window.location.pathname;
    const userId = pathname.includes('/user') ? pathname.split('/').pop() : undefined;
    const items: IPost[] = yield call(PostsApi.fetchPosts, userId);
    yield put(setPosts(items));
  } catch (error) {
    yield put(setPostsLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchAddPostRequest({ payload }: FetchAddPostActionInterface) {
  try {
    const item: IPost = yield call(PostsApi.addPost, payload);
    yield put(addPost(item));
  } catch (error) {
    yield put(setAddFormState(CreatePostState.ERROR));
  }
}

export function* fetchRemovePostRequrest({ payload }: RemovePostActionInterface) {
  try {
    yield call(PostsApi.removePost, payload);
  } catch (error) {
    alert('Ошибка при удалении твита');
  }
}

export function* fetchUpdatePostRequrest({ payload }: UpdatePostActionInterface) {
  try {
    yield call(PostsApi.updatePost, payload);
  } catch (error) {
    yield put(setPostsLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchToggleLikePostRequrest({ payload }: FetchToggleLikePostActionInterface) {
  try {
    const userLike: Pick<User, '_id' | 'fullname' | 'avatar'> = yield select(selectUserData);

    yield put(
      toggleLikePost({
        id: payload,
        user: {
          _id: userLike._id as string,
          fullname: userLike.fullname,
          avatar: userLike.avatar as string,
        },
      }),
    );

    yield call(PostsApi.toggleLikePost, payload);
  } catch (error) {
    console.log(error);
    yield put(setPostsLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* postsSaga() {
  yield takeLatest(PostsActionsType.FETCH_POSTS, fetchPostsRequest);
  yield takeLatest(PostsActionsType.FETCH_ADD_POST, fetchAddPostRequest);
  yield takeLatest(PostsActionsType.REMOVE_POST, fetchRemovePostRequrest);
  yield takeLatest(PostsActionsType.UPDATE_POST, fetchUpdatePostRequrest);
  yield takeLatest(PostsActionsType.FETCH_TOGGLE_LIKE_POST, fetchToggleLikePostRequrest);
}
