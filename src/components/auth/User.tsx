import { profile } from '@/service/auth';
import { profileType } from '@/types/userForm';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import Logout from './Logout';

function User({ email }: { email: string }) {
  const { data: userProfile, isLoading } = useQuery<profileType | null>({
    queryKey: ['userProfile', email],
    queryFn: () => profile(email),
    enabled: !!email,
  });
  if (isLoading) {
    ('로딩중');
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[20%] ">
        <Image
          src="/profile/profile.svg"
          alt="profileimg"
          width={80}
          height={80}
          className="rounded-full border-2 border-custom-green-600"
        />
      </div>

      <div className="justify-center flex flex-col items-center mt-3 pt-3 bg-yellow-200">
        <div> {userProfile?.nickname}님 행복한 하루 보내세요!</div>
        <div className="mt-3 space-x-2">
          <button>마이페이지</button>
          <button>마이블로그</button>
        </div>
        <div className="pb-3">
          <Logout />
        </div>
      </div>
    </>
  );
}

export default User;
