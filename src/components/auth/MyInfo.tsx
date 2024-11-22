import Image from 'next/image';
import React from 'react';
import Logout from './Logout';
import Link from 'next/link';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { userInfo, userProfileImg } from '@/service/auth';
import Loading from '../common/Loading';

function MyInfo() {
  // const user = useUserInfo((state) => state.user);
  const nickname = useUserInfo((state) => state.nickname);
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: userInfo,
  });

  const { data: profileImg, isLoading: profileLoading } = useQuery({
    queryKey: ['profileImg', user?.id],
    queryFn: () => {
      if (!user?.id) return null;
      return userProfileImg(user?.id);
    },
    enabled: !!user?.id,
    staleTime: 0,
  });

  if (profileLoading || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[20%] ">
        <Image
          src={profileImg || '/profile/profile.svg'}
          alt="profileimg"
          width={100}
          height={100}
          className="rounded-full border-2 border-custom-green-600"
        />
      </div>

      <div className="justify-center font-galmuri  flex flex-col items-center my-3  py-2 bg-yellow-200">
        {user && (
          <>
            <div> {nickname}님 행복한 하루 보내세요!</div>
            <div className="my-3 space-x-5 flex items-center">
              <Link href={'/blog/myPage'}>
                <div className=" bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black">
                  마이페이지
                </div>
              </Link>

              <Link href={'/blog'}>
                <div className="bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black">
                  마이블로그
                </div>
              </Link>
            </div>
            <Logout />
          </>
        )}
      </div>
    </>
  );
}

export default MyInfo;