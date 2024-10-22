'use client';
import User from '@/components/auth/User';
import useUserInfo from '@/zustand/useUserInfo';
import PostList from './PostList';
import Emotion from './Emotion';
import TotalEmotion from './TotalEmotion';
import Link from 'next/link';

function Default({
  blog_id,
  isOwner,
  owner,
  ownerId,
}: {
  blog_id: string;
  isOwner: boolean;
  owner: string;
  ownerId: string;
}) {
  const user = useUserInfo((state) => state.user);

  return (
    <>
      <div className="grid grid-cols-[1fr_5fr]">
        <div className="h-[300px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          {isOwner ? <User email={user?.email} /> : owner}
        </div>

        <div className=" grid grid-cols-2 h-[300px] gap-2 mx-1">
          <Emotion blog_id={blog_id} isOwner={isOwner} ownerId={ownerId} />
          <TotalEmotion user_id={ownerId} />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_5fr] mt-1">
        <div className=" h-[300px]"></div>
        <div className="mx-1  ">
          <div>
            <PostList blog_id={blog_id} />
            <Link href={'/blog/write'}>글쓰기</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Default;
