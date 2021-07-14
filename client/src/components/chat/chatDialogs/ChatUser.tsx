import React from 'react';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import { User } from '../../../store/user/contracts/state';

import PlaceHolderImg from '../../../assets/images/user/user-placeholder.png';
import { Link } from 'react-router-dom';
import { IMessage } from '../../../store/messages/contracts/state';
import { useDispatch } from 'react-redux';
import { fetchMessages } from '../../../store/messages/actionCreators';
import { isToday } from 'date-fns';
import socket from '../../../core/socket';
import { setCurrentDialog, updateDialogNewMessages } from '../../../store/dialogs/actionCreators';
interface IChatUser {
  _id: string;
  user: Pick<User, '_id' | 'fullname' | 'avatar' | 'isOnline'>;
  activeDialog: string;
  createdAt: string;
  lastMessage: IMessage;
  newMessages?: {
    count: number;
  };
  isCountNewMessages: boolean;
}

export const ChatUser = ({
  _id,
  user,
  activeDialog,
  lastMessage,
  newMessages,
  isCountNewMessages,
}: IChatUser): React.ReactElement => {
  const dispatch = useDispatch();

  const handleActiveDialog = () => {
    const dialog = {
      _id,
      user,
    };

    if (activeDialog !== _id) {
      socket.emit('DIALOGS:JOIN', dialog._id);

      dispatch(
        setCurrentDialog({
          id: _id,
          user,
        }),
      );

      dispatch(fetchMessages(_id));
      dispatch(updateDialogNewMessages(dialog._id));
    }
  };

  return (
    <Link
      to={`/chat/dialog/${_id}`}
      className={`chat__user ${activeDialog ? 'chat__user--active' : ''}`}
      onClick={handleActiveDialog}>
      <div className="chat__user-inner">
        <div className="chat__user-info">
          <div className="chat__user-avatar">
            <img src={user.avatar ? user.avatar : PlaceHolderImg} alt="" />
            <span
              className={`chat__status ${
                user.isOnline ? 'chat__status--online' : 'chat__status--offline'
              }`}></span>
          </div>
          <div className="chat__user-info__data">
            <div className="chat__user-info__fullname">
              <h6>{user.fullname}</h6>
            </div>
            {lastMessage.text ? (
              <p className="chat__user-info__message">{lastMessage?.text}</p>
            ) : null}
          </div>
        </div>
        <div className="chat__user-meta">
          <div className="chat__user-meta__time">
            {format(
              new Date(lastMessage.createdAt),
              `${isToday(new Date(lastMessage.createdAt)) ? 'p' : 'dd MMM'}`,
              {
                locale: ruLang,
              },
            )}
          </div>

          {newMessages?.count !== 0 && isCountNewMessages && (
            <div className="chat__user-meta__count">{newMessages?.count}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
