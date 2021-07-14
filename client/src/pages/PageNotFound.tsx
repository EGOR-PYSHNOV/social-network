import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/404.png';
export const PageNotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__img">
        <img src={notFoundImage} alt="" />
      </div>
      <div className="not-found__title">Oops! It looks like you're lost.</div>
      <div className="not-found__text">
        The page you're looking for isn't available. Try to search again or use the go to.
      </div>

      <Link to="/" className="not-found__button">
        Home Page
      </Link>
    </div>
  );
};
