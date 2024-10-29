'use clinet';
import { updateBlogInfo } from '@/service/blog';
import { blogInfoUpdateType } from '@/types/userBlog';
import useBlogInfo from '@/zustand/useBlogInfo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Profile() {
  const blog = useBlogInfo((state) => state.blogInfo);
  const router = useRouter();
  // const [nickname, setNickname] = useState<string>(blog?.nickname!);
  const { register, handleSubmit } = useForm<blogInfoUpdateType>();
  const updateProfile = (data: blogInfoUpdateType) => {
    const update = async (data: blogInfoUpdateType) => {
      const response = await updateBlogInfo(data);
      if (response) {
        alert('업데이트 되었습니다');
        router.replace(`/blog/${blog?.id}`);
      }
    };
    update(data);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-[10%]  mr-48  mx-auto">
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
        <input
          type="text"
          id="nickname"
          {...register('nickname')}
          defaultValue={blog?.nickname ?? ''}
        />
        <input
          type="text"
          id="blog_name"
          {...register('blog_name')}
          defaultValue={blog?.blog_name ?? ''}
        />
        <input
          type="text"
          id="description"
          {...register('description')}
          defaultValue={blog?.description ?? ''}
        />
        <button>수정</button>
      </form>
    </div>
  );
}

export default Profile;
