'use clinet';
import { getBlogProfile } from '@/service/auth';
import { updateBlogInfo } from '@/service/blog';
import { blogInfoType, blogInfoUpdateType } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Profile() {
  const router = useRouter();
  const user = useUserInfo((state) => state.user);

  const { register, handleSubmit } = useForm<blogInfoUpdateType>();

  const { data: getProfile, isLoading } = useQuery<blogInfoType | null>({
    queryKey: ['getProfile', user?.id],
    queryFn: () => {
      if (!user?.id) return null;
      return getBlogProfile(user?.id);
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return '로딩중';
  }

  const updateProfile = async (data: blogInfoUpdateType) => {
    try {
      if (!user?.id || !getProfile?.id) {
        throw new Error();
      }
      const response = await updateBlogInfo({
        ...data,
        user_id: user?.id,
      });
      if (response) {
        alert('업데이트 되었습니다');
        router.replace(`/blog/${getProfile?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-5  mx-auto">
      <Image
        src="/profile/profile.svg"
        alt="profileimg"
        width={100}
        height={100}
        className="rounded-full border-2  border-custom-green-600"
      />
      <form
        className=" flex flex-col mt-5"
        onSubmit={handleSubmit(updateProfile)}
      >
        <div className="flex flex-col my-3 ">
          <label htmlFor="nickname" id="nickname" className="text-sm">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            {...register('nickname')}
            defaultValue={getProfile?.nickname ?? ''}
            className="text-sm w-52"
          />
          <div>*최소 3자 ~ 최대 13자</div>
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="blog_name" id="blog_name" className="text-sm">
            블로그 이름
          </label>
          <input
            type="text"
            id="blog_name"
            {...register('blog_name')}
            defaultValue={getProfile?.blog_name ?? ''}
            className="text-sm"
          />
          <div>*최소 3자 ~ 최대 13자</div>
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="description" id="description" className="text-sm">
            블로그 설명
          </label>
          <input
            type="text"
            id="description"
            {...register('description')}
            defaultValue={getProfile?.description ?? ''}
            className="text-sm"
          />
          <div>*최소 3자 ~ 최대 13자</div>
        </div>

        <button className="my-5">수정</button>
      </form>
    </div>
  );
}

export default Profile;
