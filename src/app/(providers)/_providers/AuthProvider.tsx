// 'use client';
// import { getBlogProfile, userInfo } from '@/service/auth';

// import useUserInfo from '@/zustand/useUserInfo';
// import { useQuery } from '@tanstack/react-query';
// import React, { PropsWithChildren } from 'react';

// function AuthProvider({ children }: PropsWithChildren) {
//   const { saveUser, user, saveNickname, nickname } = useUserInfo();
//   console.log(user);
//   console.log(nickname);

//   const { data: userData } = useQuery({
//     queryKey: ['userData'],
//     queryFn: userInfo,
//     staleTime: 0,
//     gcTime: 0,
//     select: (data) => {
//       if (data) {
//         saveUser(data);
//         if (data.user_metadata.display_name) {
//           saveNickname(data.user_metadata.display_name);
//         }
//       }
//       return data;
//     },
//   });

//   useQuery({
//     queryKey: ['profileData', userData?.id],
//     queryFn: () => getBlogProfile(userData?.id as string),
//     staleTime: 0,
//     gcTime: 0,
//     select: (data) => {
//       if (data?.nickname) {
//         saveNickname(data.nickname);
//       }
//       return data;
//     },
//   });
//   // useEffect(() => {
//   //   try {
//   //     if (userData) {
//   //       saveUser(userData);
//   //     }
//   //   } catch (error) {
//   //     console.log('유저 정보가 없습니다');
//   //   }
//   // }, [userData, saveUser]);

//   // useEffect(() => {
//   //   try {
//   //     if (profileData?.nickname && profileData.nickname.length > 0) {
//   //       saveNickname(profileData?.nickname);
//   //     } else if (userData?.user_metadata.display_name) {
//   //       saveNickname(userData.user_metadata.display_name);
//   //     } else {
//   //     }
//   //   } catch (error) {
//   //     console.log('이메일 정보가 없습니다');
//   //   }
//   // }, [saveNickname, profileData, userData]);

//   return <div>{children}</div>;
// }

// export default AuthProvider;
'use client';

import { getUserProfile, userInfo } from '@/service/auth';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: PropsWithChildren) {
  const { saveUser, saveNickname } = useUserInfo();
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: userInfo,
    staleTime: 0, // 5분
  });
  console.log(userData);
  const { data: profileData } = useQuery({
    queryKey: ['profileData', userData?.id],
    queryFn: () => getUserProfile(userData?.id as string),
    enabled: Boolean(userData?.id),
    staleTime: 0, // 5분
  });

  // 데이터가 변경될 때만 상태 업데이트
  useEffect(() => {
    if (userData) {
      saveUser(userData);
      // if (userData.user_metadata.display_name) {
      //   saveNickname(userData.user_metadata.display_name);
      // }
    }
  }, [userData, saveUser, saveNickname, queryClient]);

  useEffect(() => {
    if (profileData?.nickname) {
      saveNickname(profileData.nickname);
    }
  }, [profileData, saveNickname, queryClient]);

  return <>{children}</>;
}

export default AuthProvider;
