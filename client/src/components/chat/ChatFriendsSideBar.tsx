import React from 'react';
import PlaceHolderImg from '../../assets/images/user/user-placeholder.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs } from '../../store/dialogs/actionCreators';
import { selectDialogs, selectIsDialogsLoaded } from '../../store/dialogs/selectors';
import { selectMeId } from '../../store/user/selectors';
import { User } from '../../store/user/contracts/state';
import { Link } from 'react-router-dom';

interface IChatFriendSideBar {
  _id: string;
  user: Pick<User, '_id' | 'fullname' | 'avatar' | 'isOnline'>;
}

export const ChatFriendsSideBar: React.FC<any> = ({ toggleChat }) => {
  const dispatch = useDispatch();
  const isLoadingDialogs = useSelector(selectIsDialogsLoaded);
  const dialogs = useSelector(selectDialogs);
  const meId = useSelector(selectMeId);

  React.useEffect(() => {
    if (!isLoadingDialogs && dialogs.length === 0) {
      dispatch(fetchDialogs());
    }
  }, [dispatch, toggleChat]);
  return (
    <div className={`chat-side ${toggleChat ? 'chat-side--active' : ''}`}>
      <div className="chat-side__body">
        {isLoadingDialogs
          ? dialogs.map((dialog) => (
              <ChatFriendSideBar
                user={meId === dialog.partner._id ? dialog.author : dialog.partner}
                key={dialog._id}
                {...dialog}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export const ChatFriendSideBar: React.FC<IChatFriendSideBar> = ({ _id, user }) => {
  return (
    <Link to={`/chat/dialog/${_id}`} className="chat-side__card">
      <div className="chat-side__avatar">
        <img src={user.avatar ? user.avatar : PlaceHolderImg} alt="" />
        <span
          className={`chat__status ${
            user.isOnline ? 'chat__status--online' : 'chat__status--offline'
          }`}></span>
      </div>
      <div className="chat-side__fullname">
        <h6>{user.fullname}</h6>
      </div>
    </Link>
  );
};
