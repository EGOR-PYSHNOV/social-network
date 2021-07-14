import React from 'react';

interface ILoader {
  cls?: string | null;
}

export const Loader = ({ cls }: ILoader) => {
  return (
    <div className={`loader ${cls} `}>
      <div className="loader__typing"></div>
    </div>
  );
};
