'use client';
import User from '@/components/auth/User';
import useUserInfo from '@/zustand/useUserInfo';
import PostList from './PostList';
import Emotion from './Emotion';
import TotalEmotion from './TotalEmotion';
import Link from 'next/link';
import useBlogInfo from '@/zustand/useBlogInfo';

function Default({
  blog_id,
  ownerNick,
}: {
  blog_id: string;
  ownerNick: string;
}) {
  const user = useUserInfo((state) => state.user);
  const ownerId = useBlogInfo((state) => state.ownerId);
  const isOwner = user?.id === ownerId;
  return (
    <>
      <div className="grid grid-cols-[1fr_5fr]">
        <div className="h-[300px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          {isOwner ? <User email={user?.email} /> : ownerNick}
        </div>

        <div className=" grid grid-cols-2 h-[300px] gap-2 mx-1">
          <Emotion blog_id={blog_id} />
          <TotalEmotion />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_5fr] mt-1">
        <div className=" h-[300px]">
          {isOwner ? (
            <Link
              href={`/blog/write?ownerId=${ownerId}`}
              className="text-black text-sm"
            >
              <div className="w-full text-center p-2 rounded-lg  bg-custom-green-600 shadow-sm  hover:brightness-105">
                글쓰기
              </div>
            </Link>
          ) : (
            ''
          )}
          <Link href={`/blog/guestBook`} className="text-black text-sm">
            <div className="w-full text-center p-2 rounded-lg  bg-custom-green-400 shadow-sm mt-1 hover:brightness-105 ">
              방명록
            </div>
          </Link>
        </div>
        <div className="mx-1  ">
          <PostList blog_id={blog_id} />
        </div>
      </div>
    </>
  );
}

export default Default;
