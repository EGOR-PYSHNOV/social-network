import { LoadingStatus } from './../types';
import { PostsState, CreatePostState } from './contracts/state';
import { RootState } from './../store';
export const selectPostsState = (state: RootState): PostsState => state.posts;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
  selectPostsState(state).LoadingStatus;

export const selectAddFormState = (state: RootState): CreatePostState =>
  selectPostsState(state).addFormState;

export const selectPostLikeState = (state: RootState): LoadingStatus =>
  selectPostsState(state).postLikeState;

export const selectPosts = (state: RootState) => selectPostsState(state).posts;

export const selectIsPostsLoading = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectIsPostsLoaded = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADED;
