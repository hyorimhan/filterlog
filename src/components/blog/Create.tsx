'use client';
import { createBlog } from '@/service/blog';
import { createBlogType } from '@/types/userBlog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { blogDescription, blogName } from './createBlogValidate';

function Create() {
  const { register, handleSubmit } = useForm<createBlogType>();
  const router = useRouter();

  const create = async (data: createBlogType) => {
    const response = await createBlog(data);
    if (response) {
      alert('블로그가 생성되었습니다');
      router.replace('');
    } else {
      alert('블로그가 생성되지 못했습니다');
    }

    if (response.error) {
      alert(response.error);
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
