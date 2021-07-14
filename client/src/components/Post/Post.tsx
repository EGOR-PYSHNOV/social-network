import React from 'react';
import Popup from 'reactjs-popup';

import { FaRegComment } from 'react-icons/fa';
import { IPost } from '../../store/posts/contracts/state';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToggleLikePost, removePost } from '../../store/posts/actionCreators';
import { EditPostPopUp } from './EditPostPopUp';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import { Link } from 'react-router-dom';
import { selectMeId } from '../../store/user/selectors';
import PlaceHolderImg from '../../assets/images/user/user-placeholder.png';
import { PostLikes } from './PostLike';
import { setPost } from '../../store/post/actionCreators';

export const Post = React.memo(
  ({ _id, text, createdAt, user, images, likes, comments }: IPost): React.ReactElement => {
    const dispatch = useDispatch();
    const meId = useSelector(selectMeId);

    const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
      if (window.confirm('Вы действительно хотите удалить твит?')) {
        dispatch(removePost(_id));
      }
    };

    const handleSetPost = () => {
      dispatch(
        setPost({
          _id,
          createdAt,
          text,
          images,
          user,
          likes,
        }),
      );
    };

    return (
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

          {meId === user._id ? (
            <div className="post__func">
              <Popup
                trigger={
                  <div className="post__func-button">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                }
                position="right center"
                nested
                className="post__func"
                arrow={false}>
                <div onClick={handleRemove}>Delete post</div>
                <EditPostPopUp id={_id} text={text} />
              </Popup>
            </div>
          ) : null}
        </div>
        <div className="post__text">
          {text}
          <Link to={`/post/${_id}`} onClick={handleSetPost} className="post__see-more">
            See more
          </Link>
        </div>
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

          <Link to={`/post/${_id}`} className="post__actions-item">
            <div className="post__actions-item__inner gradient-red">
              <FaRegComment className="post__actions-icon" />
            </div>
            <div className="post__action-count">{comments?.length} Comment</div>
          </Link>
        </div>
      </div>
    );
  },
);
