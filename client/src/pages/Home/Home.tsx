import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { CreatePost } from '../../components/Post/CreatePost';
import { Post } from '../../components/Post/Post';
import { Loader } from '../../components/ui/Loader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { fetchPosts } from '../../store/posts/actionCreators';
import { selectIsPostsLoading, selectPosts } from '../../store/posts/selectors';
import { Layout } from '../Layout';

export const HomePage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsPostsLoading);
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          <CreatePost />
          {isLoading ? (
            <Loader />
          ) : (
            posts.map((post) => <Post key={post._id} images={post.images} {...post} />)
          )}
        </div>
      </Layout>
    </>
  );
};

export const Home = compose(withAuthRedirect)(HomePage);
