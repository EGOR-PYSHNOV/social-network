import { IDialog } from '../../dialogs/contracts/state';
import { LoadingStatus, UserStatus } from './../../types';

export interface User {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  avatar?: string;
  isOnline?: boolean;
  dialogs?: IDialog[];
}

export interface ISignUp {
  email: string;
  username: string;
  fullname: string;
  password: string;
  password2: string;
  about: string;
  avatar: string;
  location: string;
}

export interface UserState {
  data: User | undefined;
  status: LoadingStatus | UserStatus;
  userId: string | null;
  isConfirmed: boolean;
}
