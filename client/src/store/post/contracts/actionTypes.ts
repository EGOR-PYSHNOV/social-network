import { PostState } from './state';
import { Action } from 'redux';
import { User } from '../../user/contracts/state';

export enum PostActionsType {
  SET_POST = 'post/SET_POST',
  FETCH_POST = 'post/FETCH_POST',
  FETCH_TOGGLE_LIKE_POST = 'post/FETCH_TOGGLE_LIKE_POST',
  TOGGLE_LIKE_POST = 'post/TOGGLE_LIKE_POST',
  ADD_COMMENT_TO_POST = 'post/ADD_COMMENT_TO_POST',
  FETCH_ADD_COMMENT_TO_POST = 'post/FETCH_ADD_COMMENT_TO_POST',
}

export interface SetPostActionInterface extends Action<PostActionsType> {
  type: PostActionsType.SET_POST;
  payload: PostState['post'];
}

export interface FetchPostActionInterface extends Action<PostActionsType> {
  type: PostActionsType.FETCH_POST;
}

export interface FetchToggleLikePostActionInterface extends Action<PostActionsType> {
  type: PostActionsType.FETCH_TOGGLE_LIKE_POST;
  payload: string;
}

export interface FetchCommentToPostActionInterface extends Action<PostActionsType> {
  type: PostActionsType.FETCH_ADD_COMMENT_TO_POST;
  payload: string;
}

export interface AddCommentToPostActionInterface extends Action<PostActionsType> {
  type: PostActionsType.ADD_COMMENT_TO_POST;
  payload: {
    user: Pick<User, '_id' | 'fullname' | 'avatar'>;
    text: string;
  };
}

export interface ToggleLikePostActionInterface extends Action<PostActionsType> {
  type: PostActionsType.TOGGLE_LIKE_POST;
  payload: {
    user: Pick<User, '_id' | 'fullname' | 'avatar'>;
  };
}

export type PostActions =
  | SetPostActionInterface
  | FetchPostActionInterface
  | FetchToggleLikePostActionInterface
  | ToggleLikePostActionInterface
  | FetchCommentToPostActionInterface
  | AddCommentToPostActionInterface;
