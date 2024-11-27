import Image from 'next/image';
import React from 'react';
import Logout from './Logout';
import Link from 'next/link';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile, userProfileImg } from '@/service/auth';
import Loading from '../common/Loading';

function MyInfo() {
  const user = useUserInfo((state) => state.user);

  // const { data: userProfile, isLoading } = useQuery({
  //   queryKey: ['user', user?.id],
  //   queryFn: userInfo,
  // });
  const { data: profileData } = useQuery({
    queryKey: ['profileData', user?.id],
    queryFn: () => getUserProfile(user?.id as string),
    enabled: Boolean(user?.id),
    staleTime: 0, // 5분
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

  if (profileLoading) {
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
          className="w-[100px] h-[100px] rounded-full border-2 border-custom-green-600"
        />
      </div>

      <div className="justify-center font-galmuri  flex flex-col items-center my-3  py-2 bg-yellow-200">
        <div> {profileData?.nickname}님 행복한 하루 보내세요!</div>
        <div className="my-3 space-x-5 flex items-center">
          <Link href={'blog/myPage'}>
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
      </div>
    </>
  );
}

export default MyInfo;
