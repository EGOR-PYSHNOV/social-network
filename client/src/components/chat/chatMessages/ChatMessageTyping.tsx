import React from 'react';
import { User } from '../../../store/user/contracts/state';
import PlaceHolderImg from '../../../assets/images/user/user-placeholder.png';
export const ChatMessageTyping: React.FC<{
  user: Pick<User, 'avatar'> | null;
}> = ({ user }) => {
  return (
    <div className="chat__message chat__message-left">
      <div className="chat__message-bubble">
        <div className="chat__message-typing">
          <span className="chat__message-typing-circle"></span>
        </div>
      </div>
      <div className="chat__message-info">
        <div className="chat__message-user">
          <img src={user?.avatar ? user.avatar : PlaceHolderImg} alt="" />
        </div>
      </div>
    </div>
  );
};
