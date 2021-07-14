import { User } from '../../user/contracts/state';
import { LoadingStatus } from '../../types';
import { IDialog } from '../../dialogs/contracts/state';

export interface IMessage {
  _id: string;
  read: boolean;
  user: Pick<User, '_id' | 'fullname' | 'avatar' | 'isOnline'>;
  text?: string;
  createdAt: string;
  dialog?: IDialog;
}

export interface MessagesState {
  messages: IMessage[];
  LoadingStatus: LoadingStatus;
}
