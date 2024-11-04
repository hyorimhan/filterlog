'use client';
import User from '@/components/auth/User';
import PostList from './PostList';
import Emotion from './Emotion';
import TotalEmotion from './TotalEmotion';
import LeftSide from '@/components/common/LeftSide';
import { useState } from 'react';

function Default() {
  const [searchWord, setSearchWord] = useState<string>('');
  return (
    <>
      <div className="grid grid-cols-[1fr_5fr]">
        <div className="h-[300px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          <User />
        </div>

        <div className=" grid grid-cols-2 h-[300px] gap-2 mx-1">
          <Emotion />
          <TotalEmotion />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_5fr] mt-1">
        <LeftSide searchWord={searchWord} setSearchWord={setSearchWord} />
        <div className="mx-1  ">
          <PostList searchWord={searchWord} />
        </div>
      </div>
    </>
  );
}

export default Default;
