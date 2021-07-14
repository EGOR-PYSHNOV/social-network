import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddCommentToPost } from '../../store/post/actionCreators';

export const AddComment = () => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState<string>('');

  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setText(e.currentTarget.value);
  };

  const handleClickAddComment = async (): Promise<void> => {
    if (text !== '') {
      dispatch(fetchAddCommentToPost(text));
      setText('');
    } else {
      alert('Введите текст!');
    }
  };
  return (
    <div>
      <textarea
        className="post__comments-form"
        cols={30}
        rows={10}
        value={text}
        onChange={handleChangeTextarea}></textarea>
      <button className="post__comments-button" onClick={handleClickAddComment}>
        Add comment
      </button>
    </div>
  );
};
