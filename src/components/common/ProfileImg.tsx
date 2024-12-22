import { useProfileQuery } from '@/hooks/user/useProfileQuery';
import Image from 'next/image';
import React from 'react';

function ProfileImg({ user_id }: { user_id: string }) {
  const { profileImg } = useProfileQuery({
    user_id,
  });
  return (
    <div className="flex flex-col items-center justify-center mt-[20%] ">
      <Image
        src={profileImg ?? '/profile/profile.svg'}
        alt="profileImg"
        width={100}
        height={100}
        priority
        className="w-[100px] h-[100px] rounded-full border-2 border-custom-green-600"
      />
    </div>
  );
}

export default ProfileImg;
