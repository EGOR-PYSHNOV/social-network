import { PostState } from './contracts/state';
import { RootState } from '../store';
export const selectPostsState = (state: RootState): PostState => state.post;

export const selectPost = (state: RootState) => selectPostsState(state).post;
