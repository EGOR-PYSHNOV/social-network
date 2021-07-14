import React from 'react';
import { ChatFriendsSideBar } from '../components/chat/ChatFriendsSideBar';
import { Header } from '../components/Header';
import { NavigationSideBar } from '../components/NavigationSideBar';

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }: ILayout): React.ReactElement => {
  const [toggleChat, setToggleChat] = React.useState<boolean>(false);

  const handleToggleChat = () => {
    setToggleChat(!toggleChat);
  };

  return (
    <>
      <Header handleToggleChat={handleToggleChat} />
      <NavigationSideBar />
      <ChatFriendsSideBar toggleChat={toggleChat} />
      <div className="main-content">
        <div className="main-content__inner">{children}</div>
      </div>
    </>
  );
};
