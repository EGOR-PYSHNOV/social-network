import { User } from './../../user/contracts/state';
import { LoadingStatus } from '../../types';

export enum CreatePostState {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

interface ICommentPost {
  user: Pick<User, '_id' | 'fullname' | 'avatar'>;
  text: string;
}

export interface IPost {
  _id: string;
  text: string;
  images?: string[] | undefined;
  createdAt: string;
  user: Pick<User, '_id' | 'fullname' | 'avatar'>;
  likes?: Pick<User, '_id' | 'fullname' | 'avatar'>[] | undefined;
  comments?: ICommentPost[] | null;
}

export interface PostsState {
  posts: IPost[];
  LoadingStatus: LoadingStatus;
  addFormState: CreatePostState;
  postLikeState: LoadingStatus;
}
