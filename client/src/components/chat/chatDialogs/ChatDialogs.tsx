import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentDialog,
  selectDialogs,
  selectIsDialogsLoaded,
} from '../../../store/dialogs/selectors';
import { selectMeId } from '../../../store/user/selectors';
import { ChatUser } from './ChatUser';

export const ChatDialogs = React.memo(() => {
  const isLoadingDialogs = useSelector(selectIsDialogsLoaded);
  const dialogs = useSelector(selectDialogs);
  const meId = useSelector(selectMeId);
  const currentDialog = useSelector(selectCurrentDialog);

  return (
    <div className="chat__contacts chat__scroller">
      {isLoadingDialogs
        ? dialogs.map((dialog) => (
            <ChatUser
              user={meId === dialog.partner._id ? dialog.author : dialog.partner}
              isCountNewMessages={meId === dialog.newMessages.user._id ? false : true}
              key={dialog._id}
              {...dialog}
              activeDialog={currentDialog.id === dialog._id ? currentDialog.id : ''}
            />
          ))
        : null}
    </div>
  );
});
