import React from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import PlaceHolderImg from '../../../assets/images/user/user-placeholder.png';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import { User } from '../../../store/user/contracts/state';
import { isToday } from 'date-fns';
interface IChatMessage {
  message?: string;
  me: boolean;
  read: boolean;
  createdAt: string;
  partner: Pick<User, '_id' | 'fullname' | 'avatar'>;
}

export const ChatMessage = ({ message, me, read, partner, createdAt }: IChatMessage) => {
  return (
    <div className={`chat__message ${me ? '' : 'chat__message-left'}`}>
      <div className="chat__message-bubble">
        <p className="chat__message-text">{message}</p>
        <span className={`chat__message-status ${read ? 'chat__message-status--read' : ' '}`}>
          <IoCheckmarkDoneOutline />
        </span>
      </div>

      <div className="chat__message-info">
        <div className="chat__message-user">
          <img src={partner.avatar ? partner.avatar : PlaceHolderImg} alt="" />
        </div>
        <span className="chat__message-sended-time">
          {format(new Date(createdAt), `${isToday(new Date(createdAt)) ? 'p' : 'dd MMM p'}`, {
            locale: ruLang,
          })}
        </span>
      </div>
    </div>
  );
};
