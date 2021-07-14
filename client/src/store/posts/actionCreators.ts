import { User } from '../user/contracts/state';
import { LoadingStatus } from './../types';
import {
  SetPostsActionInterface,
  PostsActionsType,
  FetchAddPostActionInterface,
  FetchPostsActionInterface,
  RemovePostActionInterface,
  SetAddFormStateActionInterface,
  AddPostActionInterface,
  SetPostsLoadingStatusActionInterface,
  UpdatePostActionInterface,
  FetchToggleLikePostActionInterface,
  ToggleLikePostActionInterface,
} from './contracts/actionTypes';
import { PostsState, IPost, CreatePostState } from './contracts/state';

export const setPosts = (payload: PostsState['posts']): SetPostsActionInterface => ({
  type: PostsActionsType.SET_POSTS,
  payload,
});

export const fetchAddPost = (payload: {
  text: string;
  images: string[];
}): FetchAddPostActionInterface => ({
  type: PostsActionsType.FETCH_ADD_POST,
  payload,
});

export const addPost = (payload: IPost): AddPostActionInterface => ({
  type: PostsActionsType.ADD_POST,
  payload,
});

export const setPostsLoadingStatus = (
  payload: LoadingStatus,
): SetPostsLoadingStatusActionInterface => ({
  type: PostsActionsType.SET_LOADING_STATE,
  payload,
});

export const setAddFormState = (payload: CreatePostState): SetAddFormStateActionInterface => ({
  type: PostsActionsType.SET_ADD_FORM_STATE,
  payload,
});

export const removePost = (payload: string): RemovePostActionInterface => ({
  type: PostsActionsType.REMOVE_POST,
  payload,
});

export const updatePost = (payload: { id: string; text: string }): UpdatePostActionInterface => ({
  type: PostsActionsType.UPDATE_POST,
  payload,
});

export const fetchToggleLikePost = (payload: string): FetchToggleLikePostActionInterface => ({
  type: PostsActionsType.FETCH_TOGGLE_LIKE_POST,
  payload,
});

export const toggleLikePost = (payload: {
  id: string;
  user: Pick<User, '_id' | 'fullname' | 'avatar'>;
}): ToggleLikePostActionInterface => ({
  type: PostsActionsType.TOGGLE_LIKE_POST,
  payload,
});

export const fetchPosts = (): FetchPostsActionInterface => ({
  type: PostsActionsType.FETCH_POSTS,
});
