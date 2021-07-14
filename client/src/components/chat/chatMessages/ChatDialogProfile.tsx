import React from 'react';
import { User } from '../../../store/user/contracts/state';
import PlaceHolderImg from '../../../assets/images/user/user-placeholder.png';
interface IChatDialogProfile {
  user: Pick<User, '_id' | 'fullname' | 'avatar' | 'isOnline'> | null;
}

export const ChatDialogProfile = ({ user }: IChatDialogProfile) => {
  return (
    <div className="chat__messages-profile">
      <div className="chat__messages-profile__avatar">
        <img src={user?.avatar ? user.avatar : PlaceHolderImg} alt="" />
        <span
          className={`chat__status ${
            user?.isOnline ? 'chat__status--online' : 'chat__status--offline'
          }`}></span>
      </div>
      <div className="chat__messages-profile__fullname">{user?.fullname}</div>
    </div>
  );
};
