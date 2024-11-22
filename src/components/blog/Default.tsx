'use client';
import PostList from './post/PostList';
import Emotion from './emotion/Emotion';
import TotalEmotion from './emotion/TotalEmotion';
import LeftSide from '@/components/common/LeftSide';
import User from './User';

function Default() {
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
        <LeftSide />
        <div className="mx-1  ">
          <PostList />
        </div>
      </div>
    </>
  );
}

export default Default;
