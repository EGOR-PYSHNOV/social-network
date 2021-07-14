import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CreatePost } from '../../components/Post/CreatePost';
import { Loader } from '../../components/ui/Loader';
import { selectIsPostsLoading, selectPosts } from '../../store/posts/selectors';
import { User } from '../../store/user/contracts/state';
import { Layout } from '../Layout';
import { Post } from '../../components/Post/Post';
import { UserBannerInfo } from '../../components/User/UserBannerInfo';
import { fetchPosts } from '../../store/posts/actionCreators';
import { AuthApi } from '../../api/AuthApi';
import { selectMeId } from '../../store/user/selectors';

export const UserProfile: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const isLoadingPosts = useSelector(selectIsPostsLoading);
  const [isLoadingUser, setLoadingUser] = React.useState<boolean>(true);
  const meId = useSelector(selectMeId);
  const [userData, setUserData] = React.useState<User>();
  const [userId, setUserId] = React.useState<string | null>(match.params.id);

  if (match.params.id !== userId) {
    setUserId(match.params.id);
  }

  React.useEffect(() => {
    dispatch(fetchPosts());
    if (userId) {
      AuthApi.getUserInfo(userId).then(({ data }) => {
        setUserData(data);
        setLoadingUser(false);
      });
    }
  }, [dispatch, userId]);

  return (
    <>
      <Layout>
        <div className="container">
          {isLoadingUser ? <Loader /> : <UserBannerInfo {...userData} meId={meId} />}
          {meId === userId ? <CreatePost /> : null}
          {isLoadingPosts ? (
            <Loader />
          ) : (
            posts.map((post) => <Post key={post._id} images={post.images} {...post} />)
          )}
        </div>
      </Layout>
    </>
  );
};
