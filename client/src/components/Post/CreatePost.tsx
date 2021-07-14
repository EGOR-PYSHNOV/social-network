import React from 'react';
import { BsX } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { fetchAddPost, setAddFormState } from '../../store/posts/actionCreators';
import { CreatePostState } from '../../store/posts/contracts/state';
import { uploadImage } from '../../utils/uploadImage';
import { ImageObj, UploadImage } from '../UploadImage';
export const CreatePost = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState<string>('');
  const [images, setImages] = React.useState<ImageObj[]>([]);

  const targetElem = (
    <div className="create-post__add-image">
      <HiOutlinePhotograph className="create-post__add-image__icon" />
      Photo
    </div>
  );

  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };

  const removeImage = (url: string) => {
    setImages(images.filter((obj) => obj.blobUrl !== url));
  };

  const handleClickAddPost = async (): Promise<void> => {
    const result = [];
    dispatch(setAddFormState(CreatePostState.LOADING));
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;

      const { url } = await uploadImage(file);
      result.push(url);
    }
    dispatch(fetchAddPost({ text, images: result }));
    setText('');
    setImages([]);
  };

  return (
    <div className="create-post">
      <div className="create-post__title" onClick={handleClickAddPost}>
        <div className="create-post__title-icon">
          <FaRegEdit />
        </div>
        <span>Create Post</span>
      </div>
      <div className="create-post__body">
        <figure className="create-post__avatar">
          <img src="http://sociala.uitheme.net/assets/images/user-8.png" alt="" />
        </figure>
        <textarea
          className="create-post__message"
          placeholder="What's on your mind?"
          cols={30}
          rows={10}
          onChange={handleChangeTextarea}
          value={text}></textarea>
        <UploadImage images={images} onChangeImages={setImages} target={targetElem}>
          <div className="create-post__add-images">
            {images.map((img) => {
              return (
                <div className="create-post__add-images__inner" key={img.blobUrl}>
                  <div
                    className="create-post__add-images__remove"
                    onClick={() => removeImage(img.blobUrl)}>
                    <BsX />
                  </div>
                  <img src={img.blobUrl} alt="" />
                </div>
              );
            })}
          </div>
        </UploadImage>
      </div>
    </div>
  );
};
