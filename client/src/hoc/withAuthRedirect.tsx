import { Redirect } from 'react-router-dom';
import { selectAuthStatus, selectUserStatus } from '../store/user/selectors';
import { useSelector } from 'react-redux';
import React from 'react';
import { LoadingStatus } from '../store/types';
import { Loader } from '../components/ui/Loader';

export const withAuthRedirect = (Child: any) => {
  return () => {
    const isAuth = useSelector(selectAuthStatus);
    const loadingStatus = useSelector(selectUserStatus);
    const isReady =
      loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

    if (isReady) {
      if (!isAuth) {
        return <Redirect to="/signin" />;
      } else {
        return <Child />;
      }
    } else {
      return <Loader />;
    }
  };
};
