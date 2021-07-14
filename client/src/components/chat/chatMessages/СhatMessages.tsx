import React from 'react';

import { BsChatSquareDots } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../core/socket';
import { fetchDialogs } from '../../../store/dialogs/actionCreators';
import { selectCurrentDialog } from '../../../store/dialogs/selectors';
import { addMessage, updateReadedStatus } from '../../../store/messages/actionCreators';
import { IMessage } from '../../../store/messages/contracts/state';
import { selectIsMessagesLoaded, selectMessages } from '../../../store/messages/selectors';
import { User } from '../../../store/user/contracts/state';
import { selectMeId } from '../../../store/user/selectors';
import { Loader } from '../../ui/Loader';
import { ChatDialogProfile } from './ChatDialogProfile';
import { ChatMessage } from './ChatMessage';
import { ChatMessageTyping } from './ChatMessageTyping';
import { ChatSendMessage } from './ChatSendMessage';

export const ChatMessages = () => {
  const dispatch = useDispatch();
  const isLoadingMessages = useSelector(selectIsMessagesLoaded);
  const messages = useSelector(selectMessages);
  const meId = useSelector(selectMeId);
  const currentDialog = useSelector(selectCurrentDialog);

  const scrollMessages = React.useRef<null | HTMLDivElement>(null);

  const [typingUser, setTypingUser] = React.useState<Pick<User, 'avatar'> | null>(null);

  let typingTimeoutId: any = null;

  const onNewMessage = (message: IMessage) => {
    if (message.dialog?._id === currentDialog.id) {
      dispatch(addMessage(message));

      socket.emit('CLIENT:MESSAGES_READED', currentDialog.id);

      if (meId !== message.user._id) {
        dispatch(updateReadedStatus(currentDialog.id));
      }
    }
  };

  const onFetchDialogs = () => {
    dispatch(fetchDialogs());
  };

  React.useEffect(() => {
    socket.on(
      'DIALOGS:TYPING',
      (dataTyping: { dialog: string; user: Pick<User, 'avatar'> | null }) => {
        if (dataTyping.dialog === currentDialog.id) {
          setTypingUser(dataTyping.user);
          clearInterval(typingTimeoutId);
          typingTimeoutId = setTimeout(() => {
            setTypingUser(null);
          }, 3000);
        }
      },
    );

    return () => {
      setTypingUser(null);
      socket.off('DIALOGS:TYPING');
    };
  }, [currentDialog]);

  React.useEffect(() => {
    socket.on('SERVER:NEW_MESSAGE', onNewMessage);

    return () => {
      socket.off('SERVER:NEW_MESSAGE', onNewMessage);
    };
  }, [meId, currentDialog]);

  React.useEffect(() => {
    socket.on('SERVER:DIALOG_CREATED', onFetchDialogs);
    socket.on('SERVER:NEW_MESSAGE', onFetchDialogs);
    socket.on('SERVER:MESSAGES_READED', (dialogId) => {
      if (dialogId === currentDialog.id) {
        socket.emit('CLIENT:DIALOG_IS_OPEN', {
          dialogId: currentDialog.id,
          user: currentDialog.user,
        });
      }

      dispatch(updateReadedStatus(dialogId));
    });
    return () => {
      socket.off('SERVER:DIALOG_CREATED', onFetchDialogs);
      socket.off('SERVER:NEW_MESSAGE', onFetchDialogs);
      socket.off('SERVER:MESSAGES_READED');
    };
  }, [currentDialog]);

  React.useEffect(() => {
    if (scrollMessages.current && isLoadingMessages && messages.length !== 0) {
      scrollMessages.current.scrollTo(0, 999999);
    }
  }, [isLoadingMessages, messages, typingUser]);

  return (
    <div
      className={`chat__messages  ${
        !isLoadingMessages || messages.length === 0 ? 'chat__messages--none' : ' '
      }`}>
      {isLoadingMessages ? (
        isLoadingMessages && messages.length === 0 ? (
          <div className="chat__messages-start">
            <div className="chat__messages-start__icon">
              <BsChatSquareDots />
            </div>
            <span className="chat__messages-start__title">Start Conversation!</span>
          </div>
        ) : (
          <>
            <ChatDialogProfile user={currentDialog.user} />
            <div className="chat__messages-content chat__scroller" ref={scrollMessages}>
              {messages.map((message) => {
                if (message.text) {
                  return (
                    <ChatMessage
                      key={message._id}
                      partner={message.user}
                      message={message.text}
                      me={meId === message.user._id ? true : false}
                      {...message}
                    />
                  );
                }
              })}
              {typingUser && <ChatMessageTyping user={typingUser} />}
            </div>
            <ChatSendMessage dialogId={currentDialog.id} userId={meId} />
          </>
        )
      ) : (
        <Loader cls={'loader__full'} />
      )}
    </div>
  );
};
