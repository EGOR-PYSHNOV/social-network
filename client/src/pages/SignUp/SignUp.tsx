import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignUp } from '../../store/user/actionCreators';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RegisterIMG from '../../assets/images/login-bg.jpg';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { CgUserList } from 'react-icons/cg';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ISignUp } from '../../store/user/contracts/state';
import { selectUserStatus } from '../../store/user/selectors';
import { LoadingStatus } from '../../store/types';
import PlaceHolderImg from '../../assets/images/user/user-placeholder.png';
import { MdAddAPhoto } from 'react-icons/md';
import { ImageObj } from '../../components/UploadImage';
import { BsX } from 'react-icons/bs';
import { uploadImage } from '../../utils/uploadImage';
const RegisterFormSchema = yup.object().shape({
  fullname: yup.string().required('Please enter your name'),
  email: yup.string().email('Invalid mail').required('Enter mail'),
  username: yup.string().required('Enter login'),
  password: yup.string().min(6, '​Minimum password length 6 characters').required(),
  password2: yup.string().oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const SignUp = (): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loadingStatus = useSelector(selectUserStatus);
  const [avatar, setAvatar] = React.useState<ImageObj | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: ISignUp) => {
    if (avatar) {
      const { url } = await uploadImage(avatar?.file as File);
      data.avatar = url;
    }

    dispatch(fetchSignUp(data));
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      alert('Регистрация успешна!');
      history.push('/');
    } else if (loadingStatus === LoadingStatus.ERROR) {
      alert('Ошибка при регистрации!');
    }
  }, [loadingStatus]);

  return (
    <div className="user-auth">
      <div className="user-auth__image">
        <img src={RegisterIMG} alt="" />
      </div>
      <div className="user-auth__form">
        <div className="user-auth__buttons">
          <Link to="/signin">Login</Link>
          <Link to="/signup" className="active">
            Register
          </Link>
        </div>
        <div className="user-auth__inner">
          <div className="user-auth__title">
            Create
            <br />
            your account
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user-auth__upload-avatar">
              <img src={avatar ? avatar.blobUrl : PlaceHolderImg} alt="" />
              {avatar ? (
                <span className="user-auth__upload-avatar-remove" onClick={() => setAvatar(null)}>
                  <BsX />
                </span>
              ) : null}
              <Controller
                control={control}
                render={() => (
                  <span className="user-auth__upload-avatar-icon" onClick={handleClickImage}>
                    <MdAddAPhoto />
                    <input
                      onChange={(e) => {
                        const file = e.target.files?.[0] as File;
                        const fileObj = new Blob([file]);
                        setAvatar({
                          blobUrl: URL.createObjectURL(fileObj),
                          file,
                        });
                      }}
                      ref={inputRef}
                      type="file"
                      hidden
                    />
                  </span>
                )}
                name="avatar"
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <>
                    <div className="input__wrapper">
                      <div className="input__wrapper-icon">
                        <AiOutlineMail />
                      </div>
                      <input
                        type="email"
                        id="email"
                        placeholder="email"
                        className="input"
                        {...field}
                      />
                    </div>

                    {!!errors.email ? (
                      <div className="input__error">{errors.email?.message}</div>
                    ) : null}
                  </>
                )}
                control={control}
                name="email"
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <>
                    <div className="input__wrapper">
                      <div className="input__wrapper-icon">
                        <AiOutlineUser />
                      </div>
                      <input
                        type="text"
                        id="username"
                        placeholder="username"
                        className="input"
                        {...field}
                      />
                    </div>
                    {!!errors.username ? (
                      <div className="input__error">{errors.username?.message}</div>
                    ) : null}
                  </>
                )}
                control={control}
                name="username"
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <>
                    <div className="input__wrapper">
                      <div className="input__wrapper-icon">
                        <CgUserList />
                      </div>
                      <input
                        type="text"
                        id="fullname"
                        placeholder="fullname"
                        className="input"
                        {...field}
                      />
                    </div>
                    {!!errors.fullname ? (
                      <div className="input__error">{errors.fullname?.message}</div>
                    ) : null}
                  </>
                )}
                control={control}
                name="fullname"
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <>
                    <div className="input__wrapper">
                      <div className="input__wrapper-icon">
                        <RiLockPasswordLine />
                      </div>
                      <input
                        type="password"
                        id="password"
                        placeholder="password"
                        className="input"
                        {...field}
                      />
                    </div>
                    {!!errors.password ? (
                      <div className="input__error">{errors.password?.message}</div>
                    ) : null}
                  </>
                )}
                control={control}
                name="password"
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <>
                    <div className="input__wrapper">
                      <div className="input__wrapper-icon">
                        <RiLockPasswordLine />
                      </div>
                      <input
                        type="password"
                        id="password2"
                        placeholder="password2"
                        className="input"
                        {...field}
                      />
                    </div>
                    {!!errors.password2 ? (
                      <div className="input__error">{errors.password2?.message}</div>
                    ) : null}
                  </>
                )}
                control={control}
                name="password2"
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <div className="input__wrapper">
                    <div className="input__wrapper-icon">
                      <AiOutlineInfoCircle />
                    </div>
                    <input
                      type="text"
                      id="about"
                      placeholder="about"
                      className="input"
                      {...field}
                    />
                  </div>
                )}
                control={control}
                name="about"
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <div className="input__wrapper">
                    <div className="input__wrapper-icon">
                      <GoLocation />
                    </div>
                    <input
                      type="text"
                      id="location"
                      placeholder="location"
                      className="input"
                      {...field}
                    />
                  </div>
                )}
                control={control}
                name="location"
                defaultValue=""
              />
            </div>
            <button
              disabled={loadingStatus === LoadingStatus.LOADING}
              className="user-auth__button"
              type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
