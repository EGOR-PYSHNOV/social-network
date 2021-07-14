import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { verifyEmailUser } from '../store/user/actionCreators';
import { selectConfirmStatus } from '../store/user/selectors';

export const VerifyEmailUserPage = () => {
  const dispatch = useDispatch();
  const isConfirmed = useSelector(selectConfirmStatus);
  const history = useHistory();
  React.useEffect(() => {
    const hash = window.location.pathname.split('/').pop();
    if (hash) {
      dispatch(verifyEmailUser(hash));
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => history.push('/'), 3000);
  }, [isConfirmed]);

  if (isConfirmed) {
    return (
      <div>
        Your mail has been verified, thank you! You will now be redirected to the login page
      </div>
    );
  }

  return <div>Error verified</div>;
};
