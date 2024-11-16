import { createClient } from '@/supabase/client';
import {
  blogInfoUpdateType,
  blogPostType,
  createBlogType,
  userEmotionType,
} from '@/types/userBlog';
import { User } from '@supabase/supabase-js';
import axios from 'axios';
import { commentsType } from '../types/userBlog';

const supabase = createClient();

// 블로그 생성
export const createBlog = async ({
  blog_name,
  description,
  user_id,
  nickname,
}: createBlogType) => {
  const response = await axios.post('/api/blog/create', {
    blog_name,
    description,
    user_id,
    nickname,
  });
  return response.data;
};

// 이미 생성된 블로그가 있는지 확인
export const existingBlog = async (user: User | null) => {
  if (!user || !user.id) {
    return null;
  }
  const { data: existing } = await supabase
    .from('blog')
    .select('*')
    .eq('user_id', user?.id)
    .single();

  return existing;
};

//블로그 id로 특정 블로그 정보 가져오기
export const getBlogId = async (blog_id: string) => {
  const { data, error } = await supabase
    .from('blog')
    .select('*')
    .eq('id', blog_id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

// 글 작성
export const blogPost = async ({
  blog_name,
  nickname,
  content,
  title,
  blog_id,
  img_url,
  user_id,
}: blogPostType) => {
  const response = await axios.post('/api/blog/write', {
    blog_name,
    nickname,
    content,
    title,
    blog_id,
    img_url,
    user_id,
  });
  return response.data;
};

export const myPostList = async ({
  blog_id,
  page,
  limit,
  year,
  month,
}: {
  blog_id: string;
  page: number;
  limit: number;
  year: string;
  month: string;
}) => {
  const response = await axios.get('/api/blog/post', {
    params: { blog_id, page, limit, year, month },
  });
  return response.data;
};

export const myPostDetail = async (post_id: string) => {
  const response = await axios.get(`/api/blog/post/${post_id}`, {
    params: { post_id },
  });
  return response.data;
};
//내 기분 등록
export const myEmotion = async ({
  user_id,
  blog_id,
  emotion,
}: userEmotionType) => {
  const response = await axios.post('/api/emotion', {
    user_id,
    blog_id,
    emotion,
  });
  return response.data;
};

// 등록된 감정
export const existingMyEmotion = async ({
  ownerId,
  blog_id,
  date,
}: {
  ownerId: string;
  blog_id: string;
  date: string;
}) => {
  const response = await axios.get('/api/emotion', {
    params: { ownerId, blog_id, date },
  });
  return response.data;
};

// 총 감정
export const totalMyEmotion = async ({ ownerId }: { ownerId: string }) => {
  const response = await axios.get('/api/emotion', {
    params: { ownerId, action: 'getTotalEmotions' },
  });
  return response.data;
};

// 글 삭제 (URL 경로 전달 -parmas)
export const deletePost = async (id: string) => {
  const response = await axios.delete(`/api/blog/post/${id}`);
  return response.data;
};

export const updatePost = async ({
  post_id,
  title,
  content,
  img_url,
}: {
  post_id: string;
  title: string;
  content: string;
  img_url: string[] | string | null;
}) => {
  const response = await axios.patch(`/api/blog/post/${post_id}`, {
    title,
    content,
    post_id,
    img_url,
  });
  return response.data;
};

export const updateBlogInfo = async ({
  nickname,
  blog_name,
  description,
  user_id,
}: blogInfoUpdateType) => {
  const response = await axios.patch('/api/auth/profile', {
    nickname,
    blog_name,
    description,
    user_id,
  });
  return response.data;
};

export const addComment = async ({
  user_id,
  post_id,
  content,
  nickname,
}: commentsType) => {
  const response = await axios.post(`/api/blog/comments/${post_id}`, {
    user_id,
    content,
    nickname,
    post_id,
  });
  return response.data;
};

export const commentList = async ({
  post_id,
  page,
  limit,
}: {
  post_id: string;
  page: number;
  limit: number;
}) => {
  const response = await axios.get(`/api/blog/comments/${post_id}`, {
    params: { post_id, page, limit },
  });

  return response.data;
};

export const deleteComments = async (id: string) => {
  const response = await axios.delete(`/api/blog/comments/${id}`);
  return response.data;
};

export const updateComments = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const response = await axios.patch(`/api/blog/comments/${id}`, { content });
  return response.data;
};

export const allUsers = async () => {
  const { data, error } = await supabase.from('blog').select('*');
  if (error) {
    throw new Error();
  }
  return data;
};
