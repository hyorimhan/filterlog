'use client';
import DOMPurify from 'dompurify';
import handleImageUpload from './ImgUpload';
import React, { FormEvent } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { addOfficialPost, blogPost, updatePost } from '@/service/post';

// 폼 제출
export interface BlogData {
  blog_name: string | null;
  id: string | null;
}
export default async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  targetTable: 'blogPosts' | 'official',
  nickname: string,
  isUpdate: boolean,
  post_id: string,
  user_id: string,
  title: string,
  content: string,
  router: AppRouterInstance,
  queryClient: QueryClient,
  blog: BlogData,

  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  category: string
) {
  e.preventDefault();

  setDisabled(true);

  const cleanContent = content ? DOMPurify.sanitize(content) : '';
  const { processedContent, imageUrls } = await handleImageUpload(cleanContent);

  try {
    if (isUpdate && post_id) {
      if (targetTable === 'blogPosts') {
        await updatePost({
          post_id,
          title,
          content: processedContent,
          img_url: imageUrls?.length ? imageUrls : null,
        });
      }
      // else if (targetTable === 'official') {
      // }

      alert('글이 수정되었습니다');
      router.replace(`/blog/${blog.id}`);
    } else {
      if (targetTable === 'blogPosts') {
        await blogPost({
          content: processedContent,
          title,
          nickname: nickname,
          blog_name: blog.blog_name!,
          blog_id: blog.id!,
          img_url: imageUrls?.length ? imageUrls : null,
          user_id,
        });
        alert('글이 등록되었습니다');
        router.replace(`/blog/${blog.id}`);
      } else if (targetTable === 'official') {
        await addOfficialPost({
          title,
          description: processedContent,
          category,
          img_url: imageUrls?.length ? imageUrls : null,
          owner_id: user_id,
        });
        alert('글이 등록되었습니다');
        router.replace(`/official`);
      }
    }
    queryClient.invalidateQueries({ queryKey: ['postList', blog?.id] });
  } catch (error) {
    console.log(error);
  } finally {
    setDisabled(false);
  }
}
