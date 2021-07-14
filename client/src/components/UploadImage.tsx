import React from 'react';

export interface ImageObj {
  blobUrl: string;
  file: File;
}

interface IUploadImage {
  children: React.ReactNode;
  images: ImageObj[];
  onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
  target: React.ReactElement;
}

export const UploadImage: React.FC<IUploadImage> = ({
  children,
  onChangeImages,
  target,
}): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeFileInput = React.useCallback(
    (event: Event) => {
      if (event.target) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files?.length !== 0) {
          Array.prototype.forEach.call(files, (file) => {
            const fileObj = new Blob([file]);
            onChangeImages((prev) => [
              ...prev,
              {
                blobUrl: URL.createObjectURL(fileObj),
                file,
              },
            ]);
          });
        }
      }
    },
    [onChangeImages],
  );

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeFileInput);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('change', handleChangeFileInput);
      }
    };
  }, []);

  return (
    <>
      <div onClick={handleClickImage} style={{ cursor: 'pointer' }}>
        {target}
      </div>
      {children}
      <input type="file" ref={inputRef} id="upload-input" hidden multiple />
    </>
  );
};
