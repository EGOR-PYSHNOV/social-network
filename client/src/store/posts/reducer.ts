import produce, { Draft } from 'immer';
import { LoadingStatus } from './../types';
import { PostsActions, PostsActionsType } from './contracts/actionTypes';
import { PostsState, CreatePostState } from './contracts/state';
const initialPostsState: PostsState = {
  posts: [],
  addFormState: CreatePostState.NEVER,
  LoadingStatus: LoadingStatus.NEVER,
  postLikeState: LoadingStatus.NEVER,
};

export const postsReducer = produce((draft: Draft<PostsState>, action: PostsActions) => {
  switch (action.type) {
    case PostsActionsType.SET_POSTS:
      draft.posts = action.payload;
      draft.LoadingStatus = LoadingStatus.LOADED;
      break;

    case PostsActionsType.FETCH_POSTS:
      draft.posts = [];
      draft.LoadingStatus = LoadingStatus.LOADING;
      break;

    case PostsActionsType.SET_LOADING_STATE:
      draft.LoadingStatus = action.payload;
      break;

    case PostsActionsType.SET_ADD_FORM_STATE:
      draft.addFormState = action.payload;
      break;

    case PostsActionsType.FETCH_ADD_POST:
      draft.addFormState = CreatePostState.LOADING;
      break;

    case PostsActionsType.ADD_POST:
      draft.posts.splice(0, 0, action.payload);
      draft.addFormState = CreatePostState.NEVER;
      break;

    case PostsActionsType.REMOVE_POST:
      draft.posts = draft.posts.filter((obj) => obj._id !== action.payload);
      break;

    case PostsActionsType.UPDATE_POST:
      draft.posts.forEach((obj) => {
        if (obj._id === action.payload.id) {
          obj.text = action.payload.text;
        }
      });
      break;
    case PostsActionsType.TOGGLE_LIKE_POST:
      const postIndex = draft.posts.findIndex((post) => post._id === action.payload.id);
      const findLike = draft.posts[postIndex].likes?.some(
        (like) => like._id === action.payload.user._id,
      );

      if (findLike) {
        draft.posts[postIndex].likes = draft.posts[postIndex].likes?.filter(
          (deleteUserLike) => deleteUserLike._id !== action.payload.user._id,
        );
      } else {
        draft.posts[postIndex].likes?.push(action.payload.user);
      }

      break;

    default:
      break;
  }
}, initialPostsState);
