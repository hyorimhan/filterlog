import Image from 'next/image';
import React from 'react';
import Logout from './Logout';
import Link from 'next/link';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { userProfileImg } from '@/service/auth';

function User() {
  const user = useUserInfo((state) => state.user);
  const nickname = useUserInfo((state) => state.nickname);

  const { data: profileImg, isLoading: profileLoading } = useQuery({
    queryKey: ['profileImg'],
    queryFn: () => {
      if (!user?.id) return null;
      return userProfileImg(user?.id);
    },
    enabled: !!user?.id,
    staleTime: 5000,
  });

  if (profileLoading) {
    return '로딩중';
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[20%] ">
        <Image
          src={profileImg || '/profile/profile.svg'}
          alt="profileimg"
          width={80}
          height={80}
          className="rounded-full border-2 border-custom-green-600"
        />
      </div>

      <div className="justify-center font-galmuri  flex flex-col items-center mt-3 pt-3 bg-yellow-200">
        {user?.id && (
          <>
            <div> {nickname}님 행복한 하루 보내세요!</div>
            <div className="mt-3 space-x-2 ">
              <Link href={'/blog/myPage'}>
                <button>마이페이지</button>
              </Link>

              <Link href={'/blog'}>
                <button className="text-black">마이블로그</button>
              </Link>
            </div>
            <div className="pb-3">
              <Logout />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default User;
