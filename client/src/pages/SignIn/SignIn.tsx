import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { fetchSignIn } from '../../store/user/actionCreators';
import LoginIMG from '../../assets/images/login-bg-2.jpg';
import { Link, useHistory } from 'react-router-dom';
import { ISignUp } from '../../store/user/contracts/state';
import { selectUserStatus } from '../../store/user/selectors';
import { LoadingStatus } from '../../store/types';

const LoginFormSchema = yup.object().shape({
  username: yup.string().required('Enter login'),
  password: yup.string().min(6, '​Minimum password length 6 characters').required(),
});

export const SignIn = (): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loadingStatus = useSelector(selectUserStatus);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<ISignUp, 'username' | 'password'>>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data: Pick<ISignUp, 'username' | 'password'>) => {
    dispatch(fetchSignIn(data));
  };

  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      alert('Авторизация успешна!');
      history.push('/');
    } else if (loadingStatus === LoadingStatus.ERROR) {
      alert('Неверный логин или пароль');
    }
  }, [loadingStatus]);
  return (
    <div className="user-auth user-login">
      <div className="user-auth__image">
        <img src={LoginIMG} alt="" />
      </div>
      <div className="user-auth__form">
        <div className="user-auth__buttons">
          <Link to="/signin" className="active">
            Login
          </Link>
          <Link to="/signup">Register</Link>
        </div>
        <div className="user-auth__inner user-login__inner">
          <div className="user-auth__title">
            Create
            <br />
            your account
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <button className="user-auth__button" type="submit">
              SignIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
