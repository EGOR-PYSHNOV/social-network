import React from 'react';
import { BiNews } from 'react-icons/bi';
import { SiOpenbadges } from 'react-icons/si';
import { FaWpexplorer } from 'react-icons/fa';
import { BsFillLightningFill, BsChatSquareDots } from 'react-icons/bs';
import { FiUser, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
export const NavigationSideBar = React.memo((): React.ReactElement => {
  return (
    <aside className="navigation">
      <nav className="navigation__content">
        <div className="navigation__wrap">
          <div className="navigation__caption">Feeds</div>
          <ul className="navigation__menu">
            <li>
              <Link to="/">
                <div className="navigation__icon gradient-blue">
                  <BiNews />
                </div>

                <span>Newsfeed</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="navigation__icon gradient-red">
                  <SiOpenbadges />
                </div>

                <span>Badges</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="navigation__icon gradient-gold">
                  <FaWpexplorer />
                </div>

                <span>Stories</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="navigation__icon gradient-pink">
                  <BsFillLightningFill />
                </div>

                <span>Groups</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="navigation__icon gradient-primary">
                  <FiUser />
                </div>

                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navigation__wrap">
          <div className="navigation__caption">Account</div>
          <ul className="navigation__menu">
            <li>
              <Link to="/">
                <div className="navigation__icon">
                  <FiSettings className="gray" />
                </div>

                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="navigation__icon">
                  <BsChatSquareDots className="gray" />
                </div>

                <span>Chat</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
});
