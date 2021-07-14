import React from 'react';
import Popup from 'reactjs-popup';
import { AiOutlineHeart } from 'react-icons/ai';
import PlaceHolderImg from '../../assets/images/user/user-placeholder.png';
import { Link } from 'react-router-dom';
import { User } from '../../store/user/contracts/state';
import { useDispatch } from 'react-redux';

interface IPostLikes {
  likes?: Pick<User, '_id' | 'fullname' | 'avatar'>[] | undefined;
  postId: string;
  meId: string | null;
  fetchToggleLikePost: (id: string) => void;
}

export const PostLikes: React.FC<IPostLikes> = React.memo(
  ({ likes, postId, meId, fetchToggleLikePost }) => {
    const dispatch = useDispatch();
    const [likeId, setLikeId] = React.useState<string>('');

    React.useMemo(() => {
      likes?.forEach((likeUser) => {
        if (likeUser._id === meId) {
          return setLikeId(postId);
        }
      });
    }, [likes, meId, postId]);

    const handleTogglePostLike = (postId: string): void => {
      dispatch(fetchToggleLikePost(postId));
      if (likeId === postId) {
        setLikeId('');
      } else {
        setLikeId(postId);
      }
    };

    return (
      <div
        className="post__actions-item"
        style={likes?.length !== 0 ? { cursor: 'pointer' } : { cursor: 'initial' }}>
        <div
          className="post__actions-item__inner gradient-blue"
          onClick={() => handleTogglePostLike(postId)}>
          <AiOutlineHeart
            className={`post__actions-icon post__actions-icon__heart ${
              likeId ? 'post__actions-icon__heart--active' : null
            }`}
          />
        </div>

        <Popup
          trigger={<div className="post__action-count">{likes?.length} Like</div>}
          closeOnDocumentClick
          disabled={likes?.length === 0}
          on={['hover']}
          position="top center"
          className="post__actions-item">
          {likes?.map((likeUser) => (
            <div key={likeUser.fullname}>
              <Link to={`/user/${likeUser._id}`}>
                <img
                  src={likeUser?.avatar ? likeUser.avatar : PlaceHolderImg}
                  title={likeUser.fullname}
                  alt=""
                />
              </Link>
            </div>
          ))}
        </Popup>
      </div>
    );
  },
);
