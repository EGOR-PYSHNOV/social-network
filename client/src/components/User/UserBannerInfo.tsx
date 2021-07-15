import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PlaceHolderImg from '../../assets/images/user/user-placeholder.png';

import { createDialog } from '../../store/dialogs/actionCreators';
import { IDialog } from '../../store/dialogs/contracts/state';

interface IUserInfo {
  _id?: string;
  fullname?: string;
  email?: string;
  location?: string;
  about?: string;
  avatar?: string;
  dialogs?: IDialog[];
  meId: string | null;
}

export const UserBannerInfo = ({
  _id,
  fullname,
  email,
  location,
  about,
  avatar,
  dialogs,
  meId,
}: IUserInfo) => {
  const dispatch = useDispatch();

  const handleCreateDialog = () => {
    if (_id) {
      dispatch(createDialog(_id));
    }
  };

  const dialog = dialogs?.find(
    (dialog) => dialog.author._id === meId || dialog.partner._id === meId,
  );

  return (
    <div className="user-banner">
      <figure className="user-banner__avatar">
        <img src={avatar ? avatar : PlaceHolderImg} alt="" />
      </figure>
      <div className="user-banner__inner">
        <div className="user-banner__info">
          <h1>{fullname}</h1>
          <h4>{email}</h4>
        </div>
        {location && <div className="user-banner__location">{location}</div>}
      </div>
      {about && <div className="user-banner__about">{about}</div>}

      {meId !== _id &&
        (dialog ? (
          <Link to={`/chat/dialog/${dialog._id}`} className="user-banner__button gradient-blue">
            Написать сообщение
          </Link>
        ) : (
          <div onClick={handleCreateDialog} className="user-banner__button gradient-blue">
            Начать диалог
          </div>
        ))}
    </div>
  );
};
