import produce, { Draft } from 'immer';
import { IPost } from '../posts/contracts/state';

import { PostActions, PostActionsType } from './contracts/actionTypes';
import { PostState } from './contracts/state';

const initialPostsState: PostState = {
  post: {} as IPost,
};

export const postReducer = produce((draft: Draft<PostState>, action: PostActions) => {
  switch (action.type) {
    case PostActionsType.SET_POST:
      draft.post = action.payload;
      break;

    case PostActionsType.TOGGLE_LIKE_POST:
      const findLike = draft.post.likes?.some((like) => like._id === action.payload.user._id);
      if (findLike) {
        draft.post.likes = draft.post.likes?.filter(
          (deleteUserLike) => deleteUserLike._id !== action.payload.user._id,
        );
      } else {
        draft.post.likes?.push(action.payload.user);
      }
      break;
    case PostActionsType.ADD_COMMENT_TO_POST:
      draft.post.comments?.splice(0, 0, action.payload);
      break;

    default:
      break;
  }
}, initialPostsState);
