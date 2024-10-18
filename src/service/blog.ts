import { createClient } from '@/supabase/client';
import {
  blogPostType,
  createBlogType,
  postListType,
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

// 내가 작성한 글 리스트
export const myPostList = async (
  blog_id: string
): Promise<postListType[] | null> => {
  const { data: postList, error } = await supabase
    .from('post')
    .select('title, content, created_at, id')
    .eq('blog_id', blog_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }
  return postList;
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
