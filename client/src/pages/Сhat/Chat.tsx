import React from 'react';

import { Layout } from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDialog,
  setCurrentDialog,
  updateDialogNewMessages,
} from '../../store/dialogs/actionCreators';
import socket from '../../core/socket';
import { ChatDialogs } from '../../components/chat/chatDialogs/ChatDialogs';
import { ChatMessages } from '../../components/chat/chatMessages/СhatMessages';
import { fetchMessages } from '../../store/messages/actionCreators';
import { selectCurrentDialog } from '../../store/dialogs/selectors';

export const Chat = React.memo(() => {
  const dispatch = useDispatch();
  const currentDialog = useSelector(selectCurrentDialog);

  React.useEffect(() => {
    const { pathname } = window.location;
    const dialogId = pathname.includes('/dialog') ? pathname.split('/').pop() : null;
    if (dialogId) {
      dispatch(getDialog(dialogId));

      socket.emit('DIALOGS:JOIN', dialogId);
      dispatch(fetchMessages(dialogId));
      dispatch(updateDialogNewMessages(currentDialog.id));
    }
  }, [window.location.pathname]);

  return (
    <Layout>
      <div className="chat">
        <ChatDialogs />
        <ChatMessages />
      </div>
    </Layout>
  );
});
