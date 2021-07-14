import React from 'react';
import { BsSearch } from 'react-icons/bs';
export const Search = (): React.ReactElement => {
  return (
    <div className="search">
      <form action="" className="search__form">
        <div className="search__form-group">
          <BsSearch className="search__form-icon" />
          <input
            type="text"
            placeholder="Start typing to search.."
            className="search__form-input"
          />
        </div>
      </form>
    </div>
  );
};
