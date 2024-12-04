'use client';
import useBlogInfo from '@/zustand/useBlogInfo';
import Image from 'next/image';

function User() {
  const { blogInfo } = useBlogInfo();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      {blogInfo?.profile_img ? (
        <Image
          src={blogInfo.profile_img}
          alt="bloggerInfo"
          width={100}
          height={100}
          className="w-[100px] h-[100px] border-2 rounded-full border-x-0 border-custom-green-700"
        />
      ) : (
        <Image
          src={'/profile/profile.svg'}
          alt="bloggerInfo"
          width={100}
          height={100}
          className=" border-2 rounded-full border-custom-green-700"
        />
      )}

      <div className="bg-yellow-200 p-3 w-full text-center m-2">
        {blogInfo?.nickname}님의 블로그
      </div>
    </div>
  );
}

export default User;
