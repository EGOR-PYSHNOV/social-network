import React from 'react';
import { Search } from './Search';
import { BiHomeAlt } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiChat4Line } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/user/selectors';

interface IHeader {
  handleToggleChat: () => void;
}

export const Header: React.FC<IHeader> = React.memo(({ handleToggleChat }): React.ReactElement => {
  const location = useLocation();
  const userData = useSelector(selectUserData);
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">Social network</a>
      </div>
      <Search />
      <div className="header__menu">
        <ul>
          <li
            className={
              splitLocation[1] === ''
                ? 'header__menu-item header__menu-item--active'
                : 'header__menu-item'
            }>
            <Link to="/">
              <BiHomeAlt className="header__menu-icon" />
            </Link>
          </li>
          <li className="header__menu-item">
            <Link to="/">
              <BiHomeAlt className="header__menu-icon" />
            </Link>
          </li>
          <li className="header__menu-item">
            <Link to="/">
              <BiHomeAlt className="header__menu-icon" />
            </Link>
          </li>
          <li className="header__menu-item">
            <Link to="/">
              <BiHomeAlt className="header__menu-icon" />
            </Link>
          </li>
          <li className="header__menu-item">
            <Link to="/">
              <BiHomeAlt className="header__menu-icon" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="header__inner">
        <div className="header__notification">
          <IoNotificationsOutline className="header__icon" />
        </div>

        <div className="header__profile">
          <Link to={`/user/${userData?._id}`}>
            <CgProfile className="header__icon" />
          </Link>
        </div>
      </div>
      <div className="header__chat gradient-primary" onClick={handleToggleChat}>
        <RiChat4Line />
      </div>
    </header>
  );
});
