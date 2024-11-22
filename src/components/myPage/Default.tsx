import React from 'react';
import BlogHeader from '../common/BlogHeader';
import Profile from './Profile';

function Default() {
  return (
    <>
      <BlogHeader />
      <div className="  h-full gap-2 mx-1 border-2 border-custom-green-400">
        <Profile />
      </div>
    </>
  );
}

export default Default;
