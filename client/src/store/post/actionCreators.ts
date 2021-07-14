import { User } from '../user/contracts/state';
import {
  SetPostActionInterface,
  FetchPostActionInterface,
  PostActionsType,
  FetchToggleLikePostActionInterface,
  ToggleLikePostActionInterface,
  FetchCommentToPostActionInterface,
  AddCommentToPostActionInterface,
} from './contracts/actionTypes';
import { PostState } from './contracts/state';

export const setPost = (payload: PostState['post']): SetPostActionInterface => ({
  type: PostActionsType.SET_POST,
  payload,
});

export const fetchPost = (): FetchPostActionInterface => ({
  type: PostActionsType.FETCH_POST,
});

export const fetchToggleLikePost = (payload: string): FetchToggleLikePostActionInterface => ({
  type: PostActionsType.FETCH_TOGGLE_LIKE_POST,
  payload,
});

export const fetchAddCommentToPost = (payload: string): FetchCommentToPostActionInterface => ({
  type: PostActionsType.FETCH_ADD_COMMENT_TO_POST,
  payload,
});

export const addCommentToPost = (payload: {
  user: Pick<User, '_id' | 'fullname' | 'avatar'>;
  text: string;
}): AddCommentToPostActionInterface => ({
  type: PostActionsType.ADD_COMMENT_TO_POST,
  payload,
});

export const toggleLikePost = (payload: {
  user: Pick<User, '_id' | 'fullname' | 'avatar'>;
}): ToggleLikePostActionInterface => ({
  type: PostActionsType.TOGGLE_LIKE_POST,
  payload,
});
