'use client';
import DOMPurify from 'dompurify';
import handleImageUpload from './ImgUpload';
import { blogPost, updatePost } from '@/service/blog';
import React, { FormEvent } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// 폼 제출
export interface BlogData {
  blog_name: string;
  id: string;
}
export default async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  nickname: string,
  isUpdate: boolean,
  post_id: string,
  user_id: string,
  title: string,
  content: string,
  router: AppRouterInstance,
  queryClient: QueryClient,
  blog: BlogData,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  e.preventDefault();

  setDisabled(true);

  const cleanContent = content ? DOMPurify.sanitize(content) : '';
  const { processedContent, imageUrls } = await handleImageUpload(cleanContent);

  try {
    if (isUpdate && post_id) {
      await updatePost({
        post_id,
        title,
        content: processedContent,
        img_url: imageUrls?.length ? imageUrls : null,
      });
      alert('글이 수정되었습니다');
      router.replace(`/blog/${blog.id}`);
    } else {
      await blogPost({
        content: processedContent,
        title,
        nickname: nickname,
        blog_name: blog.blog_name,
        blog_id: blog.id,
        img_url: imageUrls?.length ? imageUrls : null,
        user_id,
      });
      alert('글이 등록되었습니다');
      router.replace(`/blog/${blog.id}`);
    }
    queryClient.invalidateQueries({ queryKey: ['postList', blog?.id] });
  } catch (error) {
    console.log(error);
  } finally {
    setDisabled(false);
  }
}
