import { User } from '../../user/contracts/state';
import { LoadingStatus } from '../../types';
import { IMessage } from '../../messages/contracts/state';

export interface IDialog {
  _id: string;
  author: Pick<User, '_id' | 'fullname' | 'avatar' | 'isOnline'>;
  partner: Pick<User, '_id' | 'fullname' | 'avatar' | 'isOnline'>;
  createdAt: string;
  lastMessage: IMessage;
  newMessages: {
    count: number;
    user: Pick<User, '_id'>;
  };
}

export interface DialogsState {
  dialogs: IDialog[];
  currentDialog: {
    id: string;
    user: Pick<User, '_id' | 'fullname' | 'avatar'> | null;
  };
  LoadingStatus: LoadingStatus;
}
