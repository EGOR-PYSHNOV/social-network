import React from 'react';
import { ImAttachment } from 'react-icons/im';
import { GrEmoji } from 'react-icons/gr';
import { FaTelegramPlane } from 'react-icons/fa';

import { useDispatch } from 'react-redux';
import { fetchAddMessage } from '../../../store/messages/actionCreators';
import socket from '../../../core/socket';

interface IChatSendMessage {
  dialogId: string;
  userId: string | null;
}

export const ChatSendMessage = ({ dialogId, userId }: IChatSendMessage) => {
  const dispatch = useDispatch();

  const [message, setMessage] = React.useState<string>('');

  const handleChangeMessage = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    socket.emit('DIALOGS:TYPING', { dialogId, userId });

    if (message !== '' && e.key === 'Enter') {
      dispatch(fetchAddMessage({ text: message, dialogId }));
      setMessage('');
    }
  };

  const handleClickAddMessage = () => {
    if (message !== '') {
      dispatch(fetchAddMessage({ text: message, dialogId }));

      setMessage('');
    } else {
      alert('Введите сообщение!');
    }
  };

  return (
    <div className="chat__messages-add">
      <div className="chat__messages-add__attagement">
        <GrEmoji />
        <ImAttachment />
      </div>
      <div className="chat__messages-add__input">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyUp={handleChangeMessage}
        />
      </div>

      <button className="chat__messages-add__send" onClick={handleClickAddMessage}>
        <FaTelegramPlane />

        <span>Send</span>
      </button>
    </div>
  );
};
