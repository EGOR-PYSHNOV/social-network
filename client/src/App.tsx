import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { FullPost } from './pages/FullPost/FullPost';
import { Home } from './pages/Home/Home';
import { PageNotFound } from './pages/PageNotFound';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { UserProfile } from './pages/UserProfile/UserPage';
import { VerifyEmailUserPage } from './pages/VerifyEmailUserPage';
import { Chat } from './pages/Сhat/Chat';
import { fetchUserData } from './store/user/actionCreators';

function App(): React.ReactElement {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/" component={Home} exact />
        <Route path="/chat" component={Chat} />
        <Route path="/user/:id" component={UserProfile} exact />
        <Route path="/post/:id" component={FullPost} exact />
        <Route path="/user/activate/:hash" component={VerifyEmailUserPage} exact />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
