'use client';
import { createBlog } from '@/service/blog';
import { createBlogType } from '@/types/userBlog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import useUserInfo from '@/zustand/useUserInfo';
import { blogDescription, blogName } from './createBlogValidate';
import toast from 'react-hot-toast';
// import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';
import { UseBlogQuery, UseProfileQuery } from '@/hooks/user/UseProfileQuery';

function Create() {
  const { register, handleSubmit } = useForm<createBlogType>();

  const { user, nickname } = useUserInfo();
  const router = useRouter();
  const user_id = user?.id;

  const { profileData } = UseProfileQuery({ user_id: user_id ?? '' });
  const { existingData, isLoading } = UseBlogQuery({ user_id: user_id ?? '' });

  // const { data: existingData, isLoading } = useQuery({
  //   queryKey: ['existingData', user?.id],
  //   queryFn: () => existingBlog(user_id!),
  //   enabled: !!user_id,
  //   gcTime: 0,
  // });

  useEffect(() => {
    if (!user) {
      router.replace('/IE');
    }
  }, [user, existingData, router]);

  if (existingData) {
    router.replace(`/blog/${existingData.id}`);
    return <Loading />;
  }
  if (isLoading) {
    return <Loading />;
  }

  const create = async (data: createBlogType) => {
    if (!user_id) {
      toast.error('오류가 발생했습니다');
      return;
    }
    const blogData = {
      ...data,
      user_id,
      nickname: profileData?.nickname ?? nickname,
    };

    const response = await createBlog(blogData);

    if (response) {
      toast.success('블로그가 생성되었습니다');
      router.replace(`/blog/${response.id}`);
    }

    if (response.error) {
      toast.error(response.error);
      console.log(response.error);
    }
  };

  const createError = (errors: FieldErrors) => {
    if (errors.blog_name?.message) {
      alert(errors.blog_name.message);
    }
    if (errors.description?.message) {
      alert(errors.description.message);
    }
  };
  return (
    <>
      <Image
        src={'blog/createBlog.svg'}
        alt="createBlog"
        width={1280}
        height={280}
        className="pt-10"
      />
      <form className="mt-5" onSubmit={handleSubmit(create, createError)}>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="blog_name" className="text-sm font-dotum">
            블로그 이름
          </label>
          <input
            type="text"
            id="blog_name"
            className="w-40"
            {...register('blog_name', blogName())}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
          <label htmlFor="description" className="text-sm font-dotum">
            블로그 설명
          </label>
          <input
            type="text"
            id="description"
            className="w-72"
            {...register('description', blogDescription())}
          />
        </div>
        <div className="flex flex-col items-center mt-10">
          <button className="w-24 h-10">블로그 생성</button>
          <span className="text-red-600 mt-2">
            * 블로그는 1개만 생성 가능합니다
          </span>
        </div>
      </form>
    </>
  );
}

export default Create;
