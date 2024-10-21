import { createClient } from '@/supabase/client';
import {
  blogPostType,
  createBlogType,
  userEmotionType,
} from '@/types/userBlog';
import { User } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient();

// 블로그 생성
export const createBlog = async ({
  blog_name,
  description,
  user_id,
  nickname,
}: createBlogType) => {
  const response = await axios.post('/api/post/blog', {
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

// 블로그 id로 특정 블로그 정보 가져오기
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
}: blogPostType) => {
  const response = await axios.post('/api/post/write', {
    blog_name,
    nickname,
    content,
    title,
    blog_id,
  });
  return response.data;
};

export const myPostList = async ({
  blog_id,
  page,
  limit,
}: {
  blog_id: string;
  page: number;
  limit: number;
}) => {
  const response = await axios.get('/api/post', {
    params: { blog_id, page, limit },
  });
  return response.data;
};

export const myPostDetail = async (id: string) => {
  const response = await axios.get(`/api/post/${id}`, { params: { id } });
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
  user_id,
  blog_id,
  date,
}: {
  user_id: string;
  blog_id: string;
  date: string;
}) => {
  const response = await axios.get('/api/emotion', {
    params: { user_id, blog_id, date },
  });
  return response.data;
};

// 총 감정
export const totalMyEmotion = async ({ user_id }: { user_id: string }) => {
  const response = await axios.get('/api/emotion', {
    params: { user_id, action: 'getTotalEmotions' },
  });
  return response.data;
};
