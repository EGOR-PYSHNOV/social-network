import { IPost, PostsState, CreatePostState } from './state';
import { LoadingStatus } from './../../types';
import { Action } from 'redux';
import { User } from '../../user/contracts/state';

export enum PostsActionsType {
  SET_POSTS = 'posts/SET_POSTS',

  FETCH_POSTS = 'posts/FETCH_POSTS',
  SET_LOADING_STATE = 'posts/SET_LOADING_STATE',
  FETCH_ADD_POST = 'posts/FETCH_ADD_POST',
  ADD_POST = 'posts/ADD_POST',
  REMOVE_POST = 'posts/REMOVE_POST',
  UPDATE_POST = 'posts/UPDATE_POST',
  FETCH_TOGGLE_LIKE_POST = 'posts/FETCH_TOGGLE_LIKE_POST',
  TOGGLE_LIKE_POST = 'posts/TOGGLE_LIKE_POST',
  SET_ADD_FORM_STATE = 'posts/SET_ADD_FORM_STATE',
}

export interface SetPostsActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.SET_POSTS;
  payload: PostsState['posts'];
}

export interface FetchAddPostActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.FETCH_ADD_POST;
  payload: {
    text: string;
    images: string[];
  };
}

export interface AddPostActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.ADD_POST;
  payload: IPost;
}
export interface RemovePostActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.REMOVE_POST;
  payload: string;
}

export interface FetchToggleLikePostActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.FETCH_TOGGLE_LIKE_POST;
  payload: string;
}

export interface ToggleLikePostActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.TOGGLE_LIKE_POST;
  payload: {
    id: string;
    user: Pick<User, '_id' | 'fullname' | 'avatar'>;
  };
}

export interface UpdatePostActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.UPDATE_POST;
  payload: {
    id: string;
    text: string;
  };
}

export interface FetchPostsActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.FETCH_POSTS;
}

export interface SetPostsLoadingStatusActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}

export interface SetAddFormStateActionInterface extends Action<PostsActionsType> {
  type: PostsActionsType.SET_ADD_FORM_STATE;
  payload: CreatePostState;
}

export type PostsActions =
  | SetPostsActionInterface
  | FetchAddPostActionInterface
  | AddPostActionInterface
  | RemovePostActionInterface
  | UpdatePostActionInterface
  | FetchPostsActionInterface
  | FetchToggleLikePostActionInterface
  | ToggleLikePostActionInterface
  | SetPostsLoadingStatusActionInterface
  | SetAddFormStateActionInterface;
