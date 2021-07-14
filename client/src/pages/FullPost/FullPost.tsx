import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import { Layout } from '../Layout';
import PlaceHolderImg from '../../assets/images/user/user-placeholder.png';
import { PostLikes } from '../../components/Post/PostLike';
import { FaRegComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../../store/post/selectors';
import { selectMeId } from '../../store/user/selectors';
import { fetchPost, fetchToggleLikePost } from '../../store/post/actionCreators';
import { Loader } from '../../components/ui/Loader';
import { isEmpty } from '../../utils/emptyObject';
import { AddComment } from '../../components/Post/AddComment';

export const FullPost = () => {
  const post = useSelector(selectPost);
  const { _id, createdAt, text, likes, user, images, comments } = post;

  const meId = useSelector(selectMeId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPost());
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          {isEmpty(post) ? (
            <Loader />
          ) : (
            <>
              <div className="post">
                <div className="post__info">
                  <Link to={`/user/${user._id}`} className="post__user">
                    <div className="post__user-img">
                      <img src={user.avatar ? user.avatar : PlaceHolderImg} alt="" />
                    </div>
                    <div className="post__user-info">
                      <div className="post__user-info-full">{user.fullname}</div>
                      <div className="post__user-info-date">
                        {format(new Date(createdAt), 'dd MMM. yyyy г.', { locale: ruLang })}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="post__text">{text}</div>
                {images?.length !== 0 && (
                  <div className="post__images">
                    {images?.map((img, idx) => (
                      <div key={idx}>
                        <img src={img} alt="" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="post__actions">
                  <PostLikes
                    postId={_id}
                    likes={likes}
                    meId={meId}
                    fetchToggleLikePost={fetchToggleLikePost}
                  />

                  <div className="post__actions-item">
                    <div className="post__actions-item__inner gradient-red">
                      <FaRegComment className="post__actions-icon" />
                    </div>
                    <div className="post__action-count">{comments?.length} Comment</div>
                  </div>
                </div>
              </div>

              <div className="post__comments">
                <h3 className="post__title">Comments</h3>

                {comments?.length === 0 ? (
                  <>
                    <div className="post__comments-none">be the first to leave a comment 😀</div>
                    <AddComment />
                  </>
                ) : (
                  <>
                    {comments?.map((comment) => {
                      return (
                        <div className="post__comment" key={comment.text}>
                          <div className="post__comment-user">
                            <div className="post__comment-user__img">
                              <img
                                src={comment.user.avatar ? comment.user.avatar : PlaceHolderImg}
                                alt=""
                              />
                            </div>
                            <div className="post__comment-user__fullname">
                              {comment.user.fullname}
                            </div>
                          </div>
                          <div className="post__comment-text">{comment.text}</div>
                        </div>
                      );
                    })}
                    <AddComment />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};
