import React from 'react';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { updatePost } from '../../store/posts/actionCreators';

interface IEditPost {
  id: string;
  text: string;
}

export const EditPostPopUp: React.FC<IEditPost> = ({ id, text }: IEditPost): React.ReactElement => {
  const dispatch = useDispatch();
  const [EditText, setEditText] = React.useState<string>(text);

  const handleEditText = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    if (e.currentTarget) {
      setEditText(e.currentTarget.value);
    }
  };

  const handleSaveEditText = (): void => {
    dispatch(updatePost({ id, text: EditText }));
  };

  return (
    <Popup className="edit-popup" trigger={<div> Edit post </div>} modal>
      {(close: any) => (
        <>
          <textarea
            className="edit-popup__input"
            cols={30}
            rows={10}
            value={EditText}
            onChange={handleEditText}></textarea>
          <div className="edit-popup__inner">
            <button
              onClick={() => {
                handleSaveEditText();
                close();
              }}
              className="edit-popup__button button gradient-primary">
              Update Post
            </button>
          </div>
        </>
      )}
    </Popup>
  );
};
